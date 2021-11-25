import { Command } from 'commander/esm.mjs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const config = require('./package.json');

export default () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [type]', 'output format')
    .version(config.version)
    .parse();
};
