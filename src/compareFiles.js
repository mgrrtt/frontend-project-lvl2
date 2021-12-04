import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const analizedData = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = compareFiles(data1[key], data2[key]);
      return { key, children, type: 'object' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data2[key], type: 'unchanged' };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, value: data1[key], type: 'removed' };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      return {
        key, oldValue: data1[key], newValue: data2[key], type: 'updated',
      };
    }
    return 'Error!';
  });

  return analizedData;
};

export default compareFiles;
