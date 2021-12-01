import { test, expect } from '@jest/globals';

import genDiff from '../index.js';

import { resultFlat, resultNested } from '../__fixtures__/results.js';

const filePath1 = './__fixtures__/file1.json';
const filePath2 = './__fixtures__/file2.json';
const filePath3 = './__fixtures__/file1.yml';
const filePath4 = './__fixtures__/file2.yml';
const filePath5 = './__fixtures__/fileNested1.json';
const filePath6 = './__fixtures__/fileNested2.json';
const filePath7 = './__fixtures__/fileNested1.yml';
const filePath8 = './__fixtures__/fileNested2.yml';

test('compare flat json files', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(resultFlat);
});

test('compare flat yaml files', () => {
  expect(genDiff(filePath3, filePath4)).toEqual(resultFlat);
});

test('compare flat yaml and json files', () => {
  expect(genDiff(filePath1, filePath4)).toEqual(resultFlat);
});

test('compare nested json files', () => {
  expect(genDiff(filePath5, filePath6)).toEqual(resultNested);
});

test('compare nested yaml files', () => {
  expect(genDiff(filePath7, filePath8)).toEqual(resultNested);
});

test('compare nested yaml and json files', () => {
  expect(genDiff(filePath5, filePath8)).toEqual(resultNested);
});
