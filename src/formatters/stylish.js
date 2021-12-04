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

const formatStylish = (tree) => {
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
          return `  ${key}: ${formatStylish(children)}`;
        case 'added':
          return `  + ${key}: ${stringify(value)}`;
        case 'removed':
          return `  - ${key}: ${stringify(value)}`;
        case 'unchanged':
          return `    ${key}: ${stringify(value)}`;
        case 'updated':
          return `  - ${key}: ${stringify(oldValue)}\n  + ${key}: ${stringify(newValue)}`;
        default:
          return `Wrong type: ${type}`;
      }
    });

    return result;
  };

  return `{\n${getResult(tree).join('\n')}\n}`;
};

export default formatStylish;
