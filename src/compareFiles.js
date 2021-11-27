import _ from 'lodash';

export default (data1, data2) => {
  // это можно в отдельную функцию
  const data1Obj = JSON.parse(data1);
  const data2Obj = JSON.parse(data2);

  const keys = _.union(Object.keys(data1Obj), Object.keys(data2Obj))
    .sort();

  // console.log(data1Obj, data2Obj);

  const analizedData = keys.flatMap((key) => {
    if (data1Obj[key] === data2Obj[key]) {
      return `  ${key}: ${data2Obj[key]}`;
    }
    if (_.has(data1Obj, key) && !_.has(data2Obj, key)) {
      return `- ${key}: ${data1Obj[key]}`;
    }
    if (!_.has(data1Obj, key) && _.has(data2Obj, key)) {
      return `+ ${key}: ${data2Obj[key]}`;
    }
    return [`- ${key}: ${data1Obj[key]}`, `+ ${key} ${data2Obj[key]}`];
  });

  return `{\n  ${analizedData.join('\n  ')}\n}`;
};
