import yaml from 'js-yaml';

export default (format) => {
  switch (format) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.load;
    case '.yaml':
      return yaml.load;
    default:
      return 'Wrong file extname!';
  }
};
