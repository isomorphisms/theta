import { cameraEye } from './contract.js';

export function createBabylonAdapter(BABYLON, canvas) {
  const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: 'high-performance'
  });
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

  const camera = new BABYLON.FreeCamera(
    'camera',
    new BABYLON.Vector3(0, 0, 3),
    scene
  );
  camera.minZ = 0.01;
  camera.maxZ = 100;

  const mesh = new BABYLON.Mesh('theta', scene);
  const material = new BABYLON.StandardMaterial('theta-material', scene);
  material.backFaceCulling = false;
  material.disableLighting = true;
  material.diffuseColor = new BABYLON.Color3(1, 1, 1);
  material.emissiveColor = new BABYLON.Color3(1, 1, 1);
  mesh.material = material;

  function upload(frame) {
    const rgba = new Float32Array((frame.colors.length / 3) * 4);
    for (let vertex = 0; vertex < frame.colors.length / 3; vertex += 1) {
      const rgbBase = vertex * 3;
      const rgbaBase = vertex * 4;
      rgba[rgbaBase] = frame.colors[rgbBase];
      rgba[rgbaBase + 1] = frame.colors[rgbBase + 1];
      rgba[rgbaBase + 2] = frame.colors[rgbBase + 2];
      rgba[rgbaBase + 3] = 1;
    }

    const data = new BABYLON.VertexData();
    data.positions = frame.positions;
    data.indices = frame.indices;
    data.colors = rgba;
    data.applyToMesh(mesh, true);
    mesh.hasVertexAlpha = false;
  }

  function setCamera(next) {
    const eye = cameraEye(next);
    camera.position.set(eye.x, eye.y, eye.z);
    camera.setTarget(new BABYLON.Vector3(next.panX, next.panY, 0));
  }

  function resize(width, height) {
    canvas.width = width;
    canvas.height = height;
    engine.resize(true);
  }

  function present() {
    scene.render();
  }

  function destroy() {
    scene.dispose();
    engine.dispose();
  }

  return { upload, setCamera, resize, present, destroy };
}
