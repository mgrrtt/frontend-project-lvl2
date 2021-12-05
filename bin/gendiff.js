#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import { createRequire } from 'module';

import genDiff from '../index.js';

const require = createRequire(import.meta.url);
const config = require('../package.json');

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .version(config.version)
  .action(
    (filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2, program.opts().format));
    },
  )
  .parse();
