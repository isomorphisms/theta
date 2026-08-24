# Phone renderer bakeoff

This branch deliberately does **not** choose a plotting/rendering library yet.
It makes six renderers consume the same Edriç-generated theta surface so the
choice can be made by touching the results on an Android phone.

## Non-negotiable split

Edriç owns:

- theta evaluation, including characteristics;
- the sampled fundamental parallelogram `z = u + v tau`;
- height selection;
- Wegert phase/modulus coloring;
- camera state;
- interpretation of rotate / pinch / pan gestures;
- theta parameter changes;
- interactive versus settled sampling resolution.

A renderer owns only:

- converting the shared surface payload to its native vertex/index buffers;
- drawing those buffers;
- applying an Edriç camera;
- resizing/presenting.

There is no Python runtime, Python sampler, Python build step, or Python plotting
implementation in this experiment.

## The six contestants

1. Three.js
2. Plotly.js
3. Babylon.js
4. deck.gl / luma.gl
5. raw WebGL / GLES-style mesh rendering
6. native Android GPU rendering, with the existing Edriç -> PowerVR path kept
   available rather than defining the application in Kotlin/Java.

The web-library adapters may contain small JavaScript glue because those APIs
are JavaScript APIs. That glue must not evaluate theta, choose colors, or own
touch semantics.

## Identical first frame

Every renderer starts with:

- `tau = i`;
- characteristic `(alpha,beta) = (0,0)`;
- modulus as height;
- the Wegert phase/modulus palette already used by the `wegert` project;
- the same camera;
- 48 x 48 samples while a finger is moving;
- 144 x 144 samples after release.

The horizontal mesh is the actual fundamental parallelogram. When `tau` moves,
the domain visibly shears/stretches instead of staying a cosmetically fixed
rectangle.

## Phone interaction contract

- one-finger drag: rotate;
- pinch: zoom;
- two-finger drag: pan;
- double tap/reset command: restore the canonical camera;
- the graph gets the full screen when controls are closed;
- a small theta control opens a bottom sheet for `Re(tau)`, `Im(tau)`,
  `alpha`, `beta`, height mode, and color mode.

Library-supplied orbit controls and plotting toolbars are disabled for the
comparison. If a library cannot be driven from the shared Edriç camera model,
that counts against it.

## What to measure on the actual phone

Appearance is only one result. Record for each renderer:

- time to first visible surface;
- touch-to-frame latency while rotating;
- touch-to-frame latency while changing `tau`;
- settled redraw time;
- approximate steady-state FPS;
- peak resident memory;
- GPU/rendering failures;
- APK/WebView payload cost attributable to the backend;
- whether gestures remain reliable at the screen edges;
- subjective legibility of zeros, phase bands, and surface shape.

A renderer is allowed to lose. The point of maintaining all six temporarily is
to postpone an architectural choice until there is phone evidence.
