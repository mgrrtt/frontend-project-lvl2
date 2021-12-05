import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// import fs from 'fs';

import genDiff from '../index.js';
import setFormat from '../src/formatters/index.js';
import setParser from '../src/parsers.js';

import {
  resultStylish,
  resultPlain,
  resultJSON,
} from '../__fixtures__/results';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// errors

test('wrong file extention', () => {
  expect(setParser('.txt'))
    .toEqual('Wrong file extention!');
});

test('wrong formatter', () => {
  expect(setFormat({}, { format: 'unknown' }))
    .toEqual('error: unknown format "unknown"! Choices: "stylish", "plain", "json"');
});

// stylish

test('compare json files using stylish formatter', () => {
  expect(genDiff(getFixturePath('oldFile.json'), getFixturePath('newFile.json')))
    .toEqual(resultStylish);
});

test('compare yaml files using stylish formatter', () => {
  expect(genDiff(getFixturePath('oldFile.yml'), getFixturePath('newFile.yml')))
    .toEqual(resultStylish);
});

test('compare yaml and json files using stylish formatter', () => {
  expect(genDiff(getFixturePath('oldFile.json'), getFixturePath('newFile.yml')))
    .toEqual(resultStylish);
});

// plain

test('compare json files using plain formatter', () => {
  const res = genDiff(getFixturePath('oldFile.json'), getFixturePath('newFile.json'), { format: 'plain' });
  expect(res).toEqual(resultPlain);
});

test('compare yml files using plain formatter', () => {
  const res = genDiff(getFixturePath('oldFile.yml'), getFixturePath('newFile.yml'), { format: 'plain' });
  expect(res).toEqual(resultPlain);
});

test('compare yaml files using plain formatter', () => {
  const res = genDiff(getFixturePath('oldFile.yaml'), getFixturePath('newFile.yaml'), { format: 'plain' });
  expect(res).toEqual(resultPlain);
});

test('compare yaml and json files using plain formatter', () => {
  const res = genDiff(getFixturePath('oldFile.json'), getFixturePath('newFile.yml'), { format: 'plain' });
  expect(res).toEqual(resultPlain);
});

// JSON

test('compare json files using json formatter', () => {
  const res = genDiff(getFixturePath('oldFile.json'), getFixturePath('newFile.json'), { format: 'json' });
  expect(res).toEqual(resultJSON);
});

test('compare yaml files using json formatter', () => {
  const res = genDiff(getFixturePath('oldFile.yml'), getFixturePath('newFile.yml'), { format: 'json' });
  expect(res).toEqual(resultJSON);
});

test('compare yaml and json files using json formatter', () => {
  const res = genDiff(getFixturePath('oldFile.json'), getFixturePath('newFile.yml'), { format: 'json' });
  expect(res).toEqual(resultJSON);
});
