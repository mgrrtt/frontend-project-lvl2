import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (tree, options = { format: 'stylish' }) => {
  if (options.format === 'stylish' || !options.format) {
    return formatStylish(tree);
  }
  if (options.format === 'plain') {
    return formatPlain(tree);
  }
  if (options.format === 'json') {
    return JSON.stringify(tree);
  }

  return `error: unknown format "${options.format}"! Choices: "stylish", "plain", "json"`;
};
