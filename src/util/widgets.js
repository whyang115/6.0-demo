import { isEmpty, last, filter } from 'lodash';
import update from 'immutability-helper';
import { WHOLE_SIZE, TEMP_WIDGET } from '../config/Drag';
import { v4 as uuid } from 'uuid';
import { widgets } from '../config';

const currentRowSize = row => {
  return row.reduce((p, c) => p + c.size, 0);
};

export const addWidget = (widgets, data) => {
  data = { ...data, id: uuid() };
  if (isEmpty(widgets)) return update(widgets, { $push: [[data]] });
  const lastRow = last(widgets);
  if (WHOLE_SIZE - currentRowSize(lastRow) >= data.size) {
    return update(widgets, { [widgets.length - 1]: { $push: [data] } });
  }
  return update(widgets, { $push: [[data]] });
};

export const getPathById = (widgets, id) => {
  for (var i = 0; i < widgets.length; i++) {
    const row = widgets[i];
    for (var j = 0; j < row.length; j++) {
      const item = widgets[i][j];
      if (item.id === id) return [i, j];
    }
  }
  return [];
};

export const removeAllTempWidget = widgets => {
  return widgets.map(row => filter(row, item => item.type !== TEMP_WIDGET));
};

export const moveWidget = (widgets, obj) => {
  const { srcItem, hoverPath, dir } = obj;
  const tempWidget = { ...srcItem.widget, type: 'TEMP_WIDGET' };

  let nextWidgets = [];
  if (dir === 'top') {
    nextWidgets = update(widgets, {
      $splice: [[hoverPath, 0, [tempWidget]]],
    });
  }
  return filter(nextWidgets, item => !isEmpty(item));
};
