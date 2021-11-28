import * as fs from 'fs';
import * as path from 'path';

import parsers from './parsers.js';

export default (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  const format = path.extname(filepath);
  const parser = parsers(format);

  return parser(data);
};
