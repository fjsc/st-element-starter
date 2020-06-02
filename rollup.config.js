
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import postcss from 'rollup-plugin-postcss'
import postcssLit from 'rollup-plugin-postcss-lit'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import {terser} from 'rollup-plugin-terser'
import html from 'rollup-plugin-fill-html'
import generatePackageJson from 'rollup-plugin-generate-package-json'

import autoprefixer from 'autoprefixer'
import postcssnested from 'postcss-nested'
import * as child_process from 'child_process';

const pkg = require('./package.json')
const isProd = process.env.NODE_ENV === 'production';


let running_dev_server = false;

function writeBundle() {
  if (!running_dev_server) {
    running_dev_server = true;
    child_process.spawn('npm', ['run', 'start:dev'], { stdio: ['ignore', 'inherit', 'inherit'], shell: true });
  }
}

export default {
  input: isProd ? 'src/element/index.ts' : 'src/demo/demo-snippet.ts',
  output: [
    { file: pkg.main, name: 'element', format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: isProd ? Object.keys(pkg.dependencies || {}) : [  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    resolve(),
    postcss({
      plugins: [  
        autoprefixer(),
        postcssnested()
      ]
    }),
    postcssLit({
      include: '**/*.{css,scss}'
    }),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Resolve source maps to the original source
    sourceMaps(),
    !isProd && html({
      template: 'demo/index.html',
      target: 'build/index.html',
      filename: 'index.html',
      externals: [
        { type: 'js', file: '//xxxx2.js' }
      ]
    }),
    isProd && terser(),
    isProd && generatePackageJson({
      baseContents: (pkg) => ({ 
        name: pkg.name,
        version: pkg.version,
        dependecencies: pkg.dependecencies
      })
    }),
    !isProd && serve({
      contentBase: ['demo', 'dist'],
    }),     
    !isProd && livereload('demo'),
  ],
}