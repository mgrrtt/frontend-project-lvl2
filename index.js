import readFile from './src/readFile.js';
import compareFiles from './src/compareFiles.js';

export default (file1, file2) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);

  return compareFiles(data1, data2);
};
