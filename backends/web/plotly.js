import { cameraEye } from './contract.js';

function splitPositions(positions) {
  const count = positions.length / 3;
  const x = new Array(count);
  const y = new Array(count);
  const z = new Array(count);
  for (let vertex = 0; vertex < count; vertex += 1) {
    const base = vertex * 3;
    x[vertex] = positions[base];
    y[vertex] = positions[base + 1];
    z[vertex] = positions[base + 2];
  }
  return { x, y, z };
}

function splitTriangles(indices) {
  const count = indices.length / 3;
  const i = new Array(count);
  const j = new Array(count);
  const k = new Array(count);
  for (let triangle = 0; triangle < count; triangle += 1) {
    const base = triangle * 3;
    i[triangle] = indices[base];
    j[triangle] = indices[base + 1];
    k[triangle] = indices[base + 2];
  }
  return { i, j, k };
}

function vertexColors(colors) {
  const count = colors.length / 3;
  const result = new Array(count);
  for (let vertex = 0; vertex < count; vertex += 1) {
    const base = vertex * 3;
    result[vertex] = [
      Math.round(255 * colors[base]),
      Math.round(255 * colors[base + 1]),
      Math.round(255 * colors[base + 2]),
      1
    ];
  }
  return result;
}

export function createPlotlyAdapter(Plotly, element) {
  let trace = null;
  let camera = null;

  const layout = {
    margin: { l: 0, r: 0, t: 0, b: 0 },
    paper_bgcolor: '#000',
    scene: {
      xaxis: { visible: false },
      yaxis: { visible: false },
      zaxis: { visible: false },
      aspectmode: 'data',
      dragmode: false
    }
  };

  const config = {
    displayModeBar: false,
    responsive: false,
    scrollZoom: false
  };

  function upload(frame) {
    const coordinates = splitPositions(frame.positions);
    const triangles = splitTriangles(frame.indices);
    trace = {
      type: 'mesh3d',
      x: coordinates.x,
      y: coordinates.y,
      z: coordinates.z,
      i: triangles.i,
      j: triangles.j,
      k: triangles.k,
      vertexcolor: vertexColors(frame.colors),
      flatshading: false,
      hoverinfo: 'skip',
      showscale: false
    };
  }

  function setCamera(next) {
    camera = next;
    const eye = cameraEye(next);
    layout.scene.camera = {
      eye: { x: eye.x, y: eye.y, z: eye.z },
      center: { x: next.panX, y: next.panY, z: 0 },
      up: { x: 0, y: 0, z: 1 }
    };
  }

  function resize(width, height) {
    layout.width = width;
    layout.height = height;
  }

  function present() {
    if (!trace) return;
    Plotly.react(element, [trace], layout, config);
  }

  function destroy() {
    Plotly.purge(element);
  }

  return { upload, setCamera, resize, present, destroy };
}
