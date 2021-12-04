import _ from 'lodash';

const countIndent = (indent) => {
  if (!indent) {
    return 1;
  }

  return indent + 1;
};

const stringify = (data, indent) => {
  if (!_.isObject(data)) {
    return data;
  }

  const objectData = Object.keys(data).map((key) => {
    const value = `${stringify(data[key])}`;

    return `{\n${'  '.repeat(indent + 2)}${key}: ${value}\n${'  '.repeat(indent)}}`;
  });

  return objectData.join('\n');
};

// const formatStylish = (tree, indent) => {
const formatStylish = (data, indent) => {
  const result = data.map(({
    key,
    value,
    type,
    oldValue,
    newValue,
    children,
  }) => {
    const indentCount = countIndent(indent + 1);

    switch (type) {
      case 'object':
        return `${'    '.repeat(indentCount)}${key}: ${formatStylish(children, indentCount)}`;
      case 'added':
        return `${'  '.repeat(indentCount)}+ ${key}: ${stringify(value, indentCount)}`;
      case 'removed':
        return `${'  '.repeat(indentCount)}- ${key}: ${stringify(value, indentCount)}`;
      case 'unchanged':
        return `  ${'  '.repeat(indentCount)}${key}: ${stringify(value, indentCount)}`;
      case 'updated':
        return `${'  '.repeat(indentCount)}- ${key}: ${stringify(oldValue, indentCount)}\n${'  '.repeat(indentCount)}+ ${key}: ${stringify(newValue, indentCount)}`;
      default:
        return `Wrong type: ${type}`;
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default formatStylish;
