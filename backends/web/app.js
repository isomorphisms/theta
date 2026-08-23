import * as THREE from 'three';
import Plotly from 'plotly.js-dist-min';
import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { Deck, OrbitView, COORDINATE_SYSTEM } from '@deck.gl/core';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { MeshGeometry } from '@luma.gl/engine';

import { createThreeAdapter } from './three.js';
import { createPlotlyAdapter } from './plotly.js';
import { createBabylonAdapter } from './babylon.js';
import { createDeckAdapter } from './deck.js';
import { createRawWebGLAdapter } from './raw-webgl.js';

const graph = document.getElementById('graph');
const rendererSelect = document.getElementById('renderer-select');
const metricsLabel = document.getElementById('metrics');
const thetaButton = document.getElementById('theta-button');
const sheet = document.getElementById('theta-sheet');

let adapter = null;
let activeRenderer = rendererSelect.value;
let currentFrame = null;
let currentFrameJSON = null;
let currentCamera = null;
let currentCameraJSON = null;
let touchSink = null;
let controlSink = null;
let renderCount = 0;
let lastRenderMilliseconds = 0;
let maxRenderMilliseconds = 0;

function nativeBridge() {
  return window.AndroidTheta || null;
}

function setNativeVisible(visible) {
  document.body.classList.toggle('native-renderer', visible);
  nativeBridge()?.setNativeVisible(visible);
}

function makeCanvas() {
  const canvas = document.createElement('canvas');
  canvas.className = 'renderer-surface';
  graph.replaceChildren(canvas);
  return canvas;
}

function makePlotlyHost() {
  const element = document.createElement('div');
  element.className = 'renderer-surface';
  graph.replaceChildren(element);
  return element;
}

function createNativeAdapter() {
  graph.replaceChildren();
  setNativeVisible(true);
  return {
    upload() {
      if (currentFrameJSON) nativeBridge()?.uploadFrame(currentFrameJSON);
    },
    setCamera() {
      if (currentCameraJSON) nativeBridge()?.setCamera(currentCameraJSON);
    },
    resize() {},
    present() { nativeBridge()?.present(); },
    destroy() { setNativeVisible(false); }
  };
}

function createAdapter(name) {
  setNativeVisible(false);
  switch (name) {
    case 'three_js':
      return createThreeAdapter(THREE, makeCanvas());
    case 'plotly_js':
      return createPlotlyAdapter(Plotly, makePlotlyHost());
    case 'babylon_js':
      return createBabylonAdapter(BABYLON, makeCanvas());
    case 'deck_gl':
      return createDeckAdapter(
        { Deck, OrbitView, SimpleMeshLayer, MeshGeometry, COORDINATE_SYSTEM },
        makeCanvas()
      );
    case 'raw_webgl':
      return createRawWebGLAdapter(makeCanvas());
    case 'native_android':
      return createNativeAdapter();
    default:
      throw new Error(`Unknown renderer ${name}`);
  }
}

function decodedFrame(payload) {
  const parsed = JSON.parse(payload);
  return {
    positions: new Float32Array(parsed.positions),
    colors: new Float32Array(parsed.colors),
    indices: new Uint32Array(parsed.indices),
    columns: parsed.columns,
    rows: parsed.rows
  };
}

function renderCurrent() {
  if (!adapter) return;
  const started = performance.now();
  const bounds = graph.getBoundingClientRect();
  adapter.resize(Math.max(1, Math.round(bounds.width)), Math.max(1, Math.round(bounds.height)));
  if (currentFrame) adapter.upload(currentFrame);
  if (currentCamera) adapter.setCamera(currentCamera);
  adapter.present();
  const elapsed = performance.now() - started;
  renderCount += 1;
  lastRenderMilliseconds = elapsed;
  maxRenderMilliseconds = Math.max(maxRenderMilliseconds, elapsed);
  metricsLabel.textContent = `${activeRenderer.replaceAll('_', ' ')} · ${elapsed.toFixed(1)} ms`;
}

function switchRenderer(name) {
  adapter?.destroy();
  activeRenderer = name;
  renderCount = 0;
  maxRenderMilliseconds = 0;
  adapter = createAdapter(name);
  renderCurrent();
}

rendererSelect.addEventListener('change', event => switchRenderer(event.target.value));
window.addEventListener('resize', renderCurrent);

thetaButton.addEventListener('click', event => {
  event.stopPropagation();
  sheet.classList.toggle('open');
});

for (const element of document.querySelectorAll('[data-control]')) {
  const send = phase => {
    if (!controlSink) return;
    const value = element.type === 'select-one'
      ? Number(element.selectedIndex)
      : Number(element.value);
    controlSink(phase, element.dataset.control, value);
    const output = document.querySelector(`[data-value-for="${element.dataset.control}"]`);
    if (output) output.textContent = Number.isFinite(value) ? value.toFixed(2) : '';
  };
  element.addEventListener('input', () => send('input'));
  element.addEventListener('change', () => send('change'));
}

for (const button of document.querySelectorAll('[data-command]')) {
  button.addEventListener('click', event => {
    event.stopPropagation();
    controlSink?.('change', button.dataset.command, 0);
  });
}

const pointers = new Map();

function normalizedPointer(event) {
  const bounds = graph.getBoundingClientRect();
  return {
    id: event.pointerId,
    x: 2 * (event.clientX - bounds.left) / Math.max(bounds.width, 1) - 1,
    y: 1 - 2 * (event.clientY - bounds.top) / Math.max(bounds.height, 1)
  };
}

function emitTouch(kind, event) {
  if (!touchSink) return;
  const contacts = [...pointers.values()].sort((left, right) => left.id - right.id);
  const first = contacts[0] || { x: 0, y: 0 };
  const second = contacts[1] || { x: 0, y: 0 };
  touchSink(
    kind,
    Number(event.timeStamp),
    Math.min(contacts.length, 2),
    first.x,
    first.y,
    second.x,
    second.y
  );
}

graph.addEventListener('pointerdown', event => {
  event.preventDefault();
  graph.setPointerCapture(event.pointerId);
  pointers.set(event.pointerId, normalizedPointer(event));
  emitTouch('down', event);
});

graph.addEventListener('pointermove', event => {
  if (!pointers.has(event.pointerId)) return;
  event.preventDefault();
  pointers.set(event.pointerId, normalizedPointer(event));
  emitTouch('move', event);
});

function finishPointer(kind, event) {
  if (!pointers.has(event.pointerId)) return;
  event.preventDefault();
  pointers.delete(event.pointerId);
  emitTouch(kind, event);
}

graph.addEventListener('pointerup', event => finishPointer('up', event));
graph.addEventListener('pointercancel', event => finishPointer('cancel', event));

window.thetaBakeoff = {
  installEdric(nextTouchSink, nextControlSink) {
    touchSink = nextTouchSink;
    controlSink = nextControlSink;
  },
  receiveFrame(payload) {
    currentFrameJSON = payload;
    currentFrame = decodedFrame(payload);
    renderCurrent();
  },
  receiveCamera(payload) {
    currentCameraJSON = payload;
    currentCamera = JSON.parse(payload);
    renderCurrent();
  },
  metrics() {
    return {
      renderer: activeRenderer,
      renders: renderCount,
      lastRenderMilliseconds,
      maxRenderMilliseconds
    };
  }
};

adapter = createAdapter(activeRenderer);
metricsLabel.textContent = 'waiting for Edriç';
