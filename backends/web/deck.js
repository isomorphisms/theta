// deck.gl is being tested as a renderer, not used for its map semantics.
// Dependencies are injected so this file does not choose package versions.

function rgbaColors(rgb) {
  const result = new Uint8Array((rgb.length / 3) * 4);
  for (let vertex = 0; vertex < rgb.length / 3; vertex += 1) {
    const source = vertex * 3;
    const target = vertex * 4;
    result[target] = Math.round(255 * rgb[source]);
    result[target + 1] = Math.round(255 * rgb[source + 1]);
    result[target + 2] = Math.round(255 * rgb[source + 2]);
    result[target + 3] = 255;
  }
  return result;
}

export function createDeckAdapter(api, canvas) {
  const {
    Deck,
    OrbitView,
    SimpleMeshLayer,
    COORDINATE_SYSTEM
  } = api;

  let mesh = null;
  let camera = null;
  let width = canvas.clientWidth || 1;
  let height = canvas.clientHeight || 1;

  const deck = new Deck({
    canvas,
    width,
    height,
    controller: false,
    views: [new OrbitView({ id: 'theta', orbitAxis: 'Z' })],
    layers: []
  });

  function upload(frame) {
    mesh = {
      attributes: {
        POSITION: { size: 3, value: frame.positions },
        COLOR_0: { size: 4, value: rgbaColors(frame.colors) }
      },
      indices: { size: 1, value: frame.indices }
    };
  }

  function viewState() {
    if (!camera) return undefined;
    return {
      target: [camera.panX, camera.panY, 0],
      rotationOrbit: camera.yaw * 180 / Math.PI,
      rotationX: 90 - camera.pitch * 180 / Math.PI,
      zoom: Math.log2(3.25 / camera.distance),
      minZoom: -4,
      maxZoom: 6
    };
  }

  function setCamera(next) {
    camera = next;
  }

  function resize(nextWidth, nextHeight) {
    width = nextWidth;
    height = nextHeight;
  }

  function present() {
    if (!mesh || !camera) return;
    const layer = new SimpleMeshLayer({
      id: 'theta-surface-layer',
      data: [{ position: [0, 0, 0] }],
      mesh,
      _instanced: false,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getPosition: object => object.position,
      getColor: [255, 255, 255, 255],
      material: false,
      pickable: false
    });
    deck.setProps({
      width,
      height,
      viewState: { theta: viewState() },
      layers: [layer]
    });
    deck.redraw(true);
  }

  function destroy() {
    deck.finalize();
  }

  return { upload, setCamera, resize, present, destroy };
}
