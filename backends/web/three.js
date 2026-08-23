import { cameraEye } from './contract.js';

export function createThreeAdapter(THREE, canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 100);
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let currentCamera = null;

  function upload(frame) {
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(frame.positions, 3, false)
    );
    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(frame.colors, 3, false)
    );
    geometry.setIndex(new THREE.BufferAttribute(frame.indices, 1, false));
    geometry.computeBoundingSphere();
  }

  function setCamera(next) {
    currentCamera = next;
    const eye = cameraEye(next);
    camera.position.set(eye.x, eye.y, eye.z);
    camera.lookAt(next.panX, next.panY, 0);
    camera.updateMatrixWorld();
  }

  function resize(width, height) {
    renderer.setSize(width, height, false);
    camera.aspect = Math.max(width, 1) / Math.max(height, 1);
    camera.updateProjectionMatrix();
    if (currentCamera) setCamera(currentCamera);
  }

  function present() {
    renderer.render(scene, camera);
  }

  function destroy() {
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  }

  return { upload, setCamera, resize, present, destroy };
}
