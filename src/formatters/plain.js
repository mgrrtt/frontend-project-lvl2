const getPath = (path, key) => {
  if (!path) {
    return key;
  }

  return `${path}.${key}`;
};

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const formatPlain = (data, path) => {
  const result = data.map(({
    key,
    value,
    type,
    oldValue,
    newValue,
    children,
  }) => {
    const fullPath = getPath(path, key);

    switch (type) {
      case 'unchanged':
        return '';
      case 'object':
        return `${formatPlain(children, fullPath)}`;
      case 'added':
        return `Property '${fullPath}' was added with value: ${stringify(value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'updated':
        return `Property '${fullPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      default:
        return `Wrong type: ${type}`;
    }
  })
    .filter((item) => item)
    .map((item) => item.replace('[object Object]', '[complex value]'));

  return result.join('\n');
};

export default formatPlain;
