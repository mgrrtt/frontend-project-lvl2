import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (tree, format = 'stylish') => {
  if (format === 'stylish' || !format) {
    return formatStylish(tree);
  }
  if (format === 'plain') {
    return formatPlain(tree);
  }
  if (format === 'json') {
    return JSON.stringify(tree);
  }

  return `error: unknown format "${format}"! Choices: "stylish", "plain", "json"`;
};
