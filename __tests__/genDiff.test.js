import { test, expect } from '@jest/globals';

import genDiff from '../index.js';

const filePath1 = './__fixtures__/file1.json';
const filePath2 = './__fixtures__/file2.json';
const filePath3 = './__fixtures__/file1.yml';
const filePath4 = './__fixtures__/file2.yml';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout 20
  + verbose: true
}`;

test('compare json files', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(result);
});

test('compare yaml files', () => {
  expect(genDiff(filePath3, filePath4)).toEqual(result);
});

test('compare yaml and json files', () => {
  expect(genDiff(filePath1, filePath4)).toEqual(result);
});
