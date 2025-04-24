/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from '@rslib/core';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  source: {
    tsconfigPath: './tsconfig.build.json',
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
});
