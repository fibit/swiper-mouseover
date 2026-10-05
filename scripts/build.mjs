/**
 * Swiper-Mouseover build script (https://github.com/fibit/swiper-mouseover)
 * Author Pavel Romanov
 * Released under the MIT License
 */
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const banner = `/**
 * Swiper-Mouseover v${pkg.version} for Swiper (https://github.com/fibit/swiper-mouseover)
 * Author ${pkg.author}
 * Released under the ${pkg.license} License
 */`;

const buildScripts = () => build({
  entryPoints: ['swiper-mouseover.js'],
  outfile: 'swiper-mouseover.min.js',
  bundle: false,
  minify: true,
  legalComments: 'none',
  banner: { js: banner }
});

const buildStyles = () => build({
  entryPoints: ['swiper-mouseover.css'],
  outfile: 'swiper-mouseover.min.css',
  minify: true,
  legalComments: 'none',
  banner: { css: banner }
});

const buildModule = () => build({
  stdin: {
    contents: `import plugin from './swiper-mouseover.js';\nexport default plugin;\nexport { plugin as MouseoverPlugin };\n`,
    resolveDir: process.cwd(),
    loader: 'js'
  },
  bundle: true,
  format: 'esm',
  outfile: 'swiper-mouseover.mjs'
});

await Promise.all([
  buildScripts(),
  buildStyles(),
  buildModule()
]);
