// Thin adapter boundary for JavaScript rendering libraries.
//
// Edriç owns all mathematics and interaction semantics. A bridge from compiled
// Edriç code supplies packed Float32/Uint32 data in this shape:
//
// frame = {
//   positions: Float32Array, // xyz xyz ...
//   colors: Float32Array,    // rgb rgb ... already Wegert-colored by Edriç
//   indices: Uint32Array,    // triangle indices
//   columns: number,
//   rows: number
// }
//
// camera = { yaw, pitch, distance, panX, panY }
//
// An adapter implements upload(frame), setCamera(camera), resize(w,h),
// present(), and destroy(). It must not evaluate theta or interpret gestures.

export function cameraEye(camera) {
  const horizontal = camera.distance * Math.cos(camera.pitch);
  return {
    x: camera.panX + horizontal * Math.sin(camera.yaw),
    y: camera.panY + horizontal * Math.cos(camera.yaw),
    z: camera.distance * Math.sin(camera.pitch)
  };
}

export function rgbCss(colors, vertex) {
  const base = vertex * 3;
  const r = Math.round(255 * colors[base]);
  const g = Math.round(255 * colors[base + 1]);
  const b = Math.round(255 * colors[base + 2]);
  return `rgb(${r},${g},${b})`;
}
