import { keys } from 'lodash';
import { enumObj } from '../util';

export const WIDGETS = {
  TEXT: 2,
  NUMBER: 3,
};

export const widgets = keys(WIDGETS);

export const enumType = enumObj(WIDGETS);

export const DEFAULT_CONFIG = {
  TEXT: {
    name: '文本',
  },
  NUMBER: {
    name: '数字',
  },
};

export const DEFAULT_DATA = {
  TEXT: {
    type: 'TEXT',
    controlName: '文本',
    size: 6,
  },
  NUMBER: {
    type: 'NUMBER',
    controlName: '数字',
    size: 6,
  },
};
