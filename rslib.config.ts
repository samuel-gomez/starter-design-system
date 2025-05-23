import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    tsconfigPath: './tsconfig.build.json',
    entry: {
      main: './src/main.ts',
    },
  },
  lib: [
    {
      format: 'esm',
      bundle: true,
      dts: false,
    },
  ],
  output: {
    target: 'node',
    minify: true,
  },
});
