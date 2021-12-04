import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// import fs from 'fs';

import genDiff from '../index.js';

import {
  resultFlat,
  resultPlain,
  // resultNested,
} from '../__fixtures__/results';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('compare flat json files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toEqual(resultFlat);
});

test('compare flat yaml files', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')))
    .toEqual(resultFlat);
});

test('compare flat yaml and json files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml')))
    .toEqual(resultFlat);
});

test('compare json files whith plain formatter', () => {
  const res = genDiff(getFixturePath('fileNested1.json'), getFixturePath('fileNested2.json'), { format: 'plain' });
  expect(res).toEqual(resultPlain);
});

test('compare yaml files whith plain formatter', () => {
  const res = genDiff(getFixturePath('fileNested1.yml'), getFixturePath('fileNested2.yml'), { format: 'plain' });
  expect(res).toEqual(resultPlain);
});

test('compare yaml and json files whith plain formatter', () => {
  const res = genDiff(getFixturePath('fileNested1.json'), getFixturePath('fileNested2.yml'), { format: 'plain' });
  expect(res).toEqual(resultPlain);
});

// test('compare nested json files', () => {
//   expect(genDiff(filePath5, filePath6)).toEqual(resultNested);
// });

// test('compare nested yaml files', () => {
//   expect(genDiff(filePath7, filePath8)).toEqual(resultNested);
// });

// test('compare nested yaml and json files', () => {
//   expect(genDiff(filePath5, filePath8)).toEqual(resultNested);
// });
