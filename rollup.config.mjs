// rollup.config.js
import { string as rollupString } from 'rollup-plugin-string';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    watch: {
      clearScreen: false,
    },
    input: 'app/js/index.tsx',
    output: [
      {
        file: 'dist/app.js',
        format: 'iife',
        sourcemap: true,
      },
    ],
    plugins: [
      rollupString({
        include: '**/*.html',
      }),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      nodeResolve({
        extensions: ['.js', '.jsx'],
        moduleDirectories: ['node_modules', '..'],
      }),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react'],
        extensions: ['.js', '.jsx'],
      }),
      commonjs(),
      replace({
        preventAssignment: false,
        'process.env.NODE_ENV': '"development"',
      }),
      copy({
        targets: [
          {
            src: 'app/static/**/*',
            dest: 'dist',
          },
        ],
      }),
    ],
  },
];
