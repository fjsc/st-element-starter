
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import postcss from 'rollup-plugin-postcss'
import postcssLit from 'rollup-plugin-postcss-lit'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import {terser} from 'rollup-plugin-terser'
import generatePackageJson from 'rollup-plugin-generate-package-json'
import autoprefixer from 'autoprefixer'
import postcssnested from 'postcss-nested'
import serve from 'rollup-plugin-serve'

const pkg = require('./../package.json')

export const config = {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, name: 'element', format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: Object.keys(pkg.dependencies || {}),
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
    terser(),
    generatePackageJson({
      baseContents: (pkg) => ({ 
        name: pkg.name,
        version: pkg.version,
        dependecencies: pkg.dependecencies
      })
    }),
    serve('./demo'),
    livereload({
        watch: [ 
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, 'src')
        ],
        exts: [ 'html', 'js', 'scss', 'sass', 'css' ]
      }),
  ],
}