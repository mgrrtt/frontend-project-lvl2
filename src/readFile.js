import * as fs from 'fs';
// import * as path from 'path';

export default (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');

  if (filepath[0] === '.') {
    // return path.resolve(data);
  }

  return data;
};
