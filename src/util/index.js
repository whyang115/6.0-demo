import { keys } from 'lodash';
export const enumObj = obj => {
  keys(obj).forEach(key => {
    obj[obj[key]] = key;
  });
  return obj;
};
