import readFile from './src/readFile.js';
import compareFiles from './src/compareFiles.js';
import getOutput from './src/formatters/index.js';

export default (file1, file2, option) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);

  const tree = compareFiles(data1, data2);

  return getOutput(tree, option);
};
