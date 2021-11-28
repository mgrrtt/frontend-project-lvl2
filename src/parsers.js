import yaml from 'js-yaml';

export default (format) => {
  let parse;

  // console.log(format);

  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  } else {
    return 'Wrong file extname!';
  }
  return parse;
};
