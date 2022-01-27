import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

const moduleName = 'inklecatjs';
const inputFile = 'src/compiler/Compiler.ts';
const format = 'umd';
const tsconfig = {
  tsconfig: "tsconfig.json",
  tsconfigOverride: {
    compilerOptions: {
      module: "es6",
      declaration: false
    }
  }
}

export default [
  {
    input: inputFile,
    output: {
      name: moduleName,
      file: 'dist/inklecate.js',
      format: format,
      sourcemap: true
    },
    plugins: [
      nodeResolve(),
      typescript(tsconfig),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.ts'],
        babelHelpers: 'bundled'
      }),
      terser(),
      sourcemaps()
    ]
  },
  {
    input: inputFile,
    output: {
      name: moduleName,
      file: 'dist/inklecate-es2015.js',
      format: format,
      sourcemap: true
    },
    plugins: [
      nodeResolve(),
      typescript(tsconfig),
      terser(),
      sourcemaps()
    ]
  }
];