import del from 'rollup-plugin-delete'
import css from 'rollup-plugin-import-css'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { main, module, jsdelivr } from './package.json'

const production = !process.env.ROLLUP_WATCH

const plugins = [
  !production && serve({ port: 6870, host: '127.0.0.1', contentBase: ['dist', 'public'] }),
  !production && livereload(),
  production && del({ targets: 'dist/*' }),
  nodeResolve(),
  babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
  css({ minify: true })
]

const output = [
  {
    name: 'message',
    sourcemap: true,
    format: 'iife',
    file: jsdelivr,
    plugins: [production && terser()]
  }
]

if (production) {
  output.push({ format: 'esm', file: module })
  output.push({ exports: 'auto', format: 'cjs', file: main })
}

export default {
  input: 'src/main.js',
  plugins,
  output,
  watch: {
    clearScreen: false
  }
}
