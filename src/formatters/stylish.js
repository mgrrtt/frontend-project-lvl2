import _ from 'lodash';

const stringify = (data, count) => {
  if (!_.isObject(data)) {
    return data;
  }

  const objectData = Object.keys(data).map((key) => {
    const value = `${stringify(data[key], count + 1)}`;
    const indent = (count + 1) * 4;

    return `${' '.repeat(indent + 2)}  ${key}: ${value}\n`;
  });

  return `{\n${objectData.join('')}${' '.repeat((count + 1) * 4)}}`;
};

const formatStylish = (data, depth = 0) => {
  const getResult = (tree, indentCount) => {
    const result = tree.map(({
      key,
      value,
      type,
      oldValue,
      newValue,
      children,
    }) => {
      const indent = ' '.repeat(indentCount * 4 + 2);

      switch (type) {
        case 'object':
          return `${indent}  ${key}: ${formatStylish(children, indentCount + 1)}`;
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, indentCount)}`;
        case 'removed':
          return `${indent}- ${key}: ${stringify(value, indentCount)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(value, indentCount)}`;
        case 'updated':
          return `${indent}- ${key}: ${stringify(oldValue, indentCount)}\n${indent}+ ${key}: ${stringify(newValue, indentCount)}`;
        default:
          return `Wrong type: ${type}`;
      }
    });

    return result;
  };

  return `{\n${getResult(data, depth).join('\n')}\n${' '.repeat(depth * 4)}}`;
};

export default formatStylish;
