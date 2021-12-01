import readFile from './src/readFile.js';
import compareFiles, { getOutput } from './src/compareFiles.js';

export default (file1, file2, options) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);

  const tree = compareFiles(data1, data2);

  return getOutput(tree, options);
};
