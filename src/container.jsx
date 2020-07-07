import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';
import WidgetSetting from './widgetSetting';
import WidgetList from './widgetList';
import WidgetDisplay from './widgetDisplay';
import { DEFAULT_DATA } from './config';
import { addWidget, getPathById, moveWidget, removeAllTempWidget } from './util/widgets';
import { get, isEmpty, filter } from 'lodash';
import { useRef } from 'react';

export default function Container() {
  const $hoverRef = useRef(null);
  const [widgets, setWidgets] = useState([]);
  const handleUpdate = (obj, index) => {
    setWidgets(update(widgets, { [index]: { $apply: item => ({ ...item, ...obj }) } }));
  };
  const handleAdd = item => {
    const data = DEFAULT_DATA[item];
    setWidgets(addWidget(widgets, data));
  };
  const handleWidgetMove = ({ srcItem, hoverPath }, dir = 'top') => {
    const tempPath = $hoverRef.current;
    console.log(`tempPath: ${tempPath}`);
    if (tempPath !== null) {
      if (JSON.stringify(hoverPath) === JSON.stringify($hoverRef.current)) return;
      $hoverRef.current = hoverPath;
      setWidgets(moveWidget(removeAllTempWidget(widgets), { srcItem, hoverPath, dir }));
      return;
    }
    setWidgets(moveWidget(widgets, { srcItem, hoverPath, dir }));
  };
  console.log(widgets);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <WidgetList addWidget={handleAdd} />
        <WidgetDisplay
          widgets={widgets}
          setWidgets={setWidgets}
          updateWidgets={handleUpdate}
          moveWidget={handleWidgetMove}
        />
        <WidgetSetting />
      </div>
    </DndProvider>
  );
}
