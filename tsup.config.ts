import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/rxjs/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['rxjs'],
});
