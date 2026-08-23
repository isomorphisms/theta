import { build } from 'esbuild';

await build({
  entryPoints: ['backends/web/app.js'],
  outfile: 'android/app/src/main/assets/bakeoff.js',
  bundle: true,
  minify: true,
  sourcemap: false,
  format: 'iife',
  platform: 'browser',
  target: ['chrome120'],
  logLevel: 'info'
});
