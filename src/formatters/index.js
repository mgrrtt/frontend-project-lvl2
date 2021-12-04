import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (tree, options = { format: 'stylish' }) => {
  if (options.format === 'stylish' || !options.format) {
    return formatStylish(tree);
  }
  if (options.format === 'plain') {
    return formatPlain(tree);
  }

  return `error: unknown format "${options.format}"! Choices: "stylish", "plain"`;
};
