import _ from 'lodash';

const stringify = (data) => {
  if (!_.isObject(data)) {
    return data;
  }

  const objectData = Object.keys(data).map((key) => {
    const value = `${stringify(data[key])}`;

    return `{\n ${key}: ${value}\n}`;
  });

  return objectData.join('\n');
};

export const getOutput = (tree, { format } = 'stylish') => {
  // console.log(format);

  const getResult = (data) => {
    const result = data.map(({
      key,
      value,
      type,
      oldValue,
      newValue,
      children,
    }) => {
      switch (type) {
        case 'object':
          return `  ${key}: ${getOutput(children)}`;
        case '+':
          return `  + ${key}: ${stringify(value)}`;
        case '-':
          return `  - ${key}: ${stringify(value)}`;
        case ' ':
          return `    ${key}: ${stringify(value)}`;
        case 'changed':
          return `  - ${key}: ${stringify(oldValue)}\n  + ${key}: ${stringify(newValue)}`;
        default:
          return `Wrong type: ${type}`;
      }
    });

    return result;
  };

  if (format === 'stylish') {
    const output = getResult(tree);

    return `{\n${output.join('\n')}\n}`;
  }

  return `error: unknown format "${format}"! Choices: "stylish", ...`;
};

const compareFiles = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const analizedData = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = compareFiles(data1[key], data2[key]);
      return { key, children, type: 'object' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data2[key], type: ' ' };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, value: data1[key], type: '-' };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, value: data2[key], type: '+' };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      return {
        key, oldValue: data1[key], newValue: data2[key], type: 'changed',
      };
    }
    return 'Error!';
  });

  return analizedData;
};

export default compareFiles;
