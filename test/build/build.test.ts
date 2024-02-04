import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { build } from '@/index';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe('build', () => {
  it('tree shaking', async () => {
    try {
      const option = {
        input: resolve(__dirname, './treeshaking/index'),
      };
      const result = `const a = 1;
const add = function (num1, num2) {
  return num1 + num2;
};
export const c = add(a, 2);`;
      const bundle = await build(option);
      const res = bundle.generate();
      expect(res.code).to.be.equal(result);
    } catch (error) {
      console.log('error', error);
    }
  });
  it('output to the dist directory', async () => {
    try {
      const output = resolve(__dirname, './dist/index.js');
      const option = {
        input: resolve(__dirname, './treeshaking/index'),
        output,
      };
      const result = `const a = 1;
const add = function (num1, num2) {
  return num1 + num2;
};
export const c = add(a, 2);`;
      const bundle = await build(option);
      await bundle.write();
      const content = await readFile(output);
      expect(content.toString()).to.be.equal(result);
    } catch (error) {
      console.log('error', error);
    }
  });
  it('external option', async () => {
    try {
      const option = {
        input: resolve(__dirname, './treeshaking/index'),
        external: ['./utils'],
      };
      const result = `import { a, add } from './utils';

export const c = add(a, 2);`;
      const bundle = await build(option);
      const res = bundle.generate();
      expect(res.code).to.be.equal(result);
    } catch (error) {
      console.log('error', error);
    }
  });
});
