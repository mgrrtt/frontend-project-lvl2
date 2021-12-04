import yaml from 'js-yaml';

export default (extention) => {
  switch (extention) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.load;
    case '.yaml':
      return yaml.load;
    default:
      return 'Wrong file extention!';
  }
};
