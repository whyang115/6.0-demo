import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import styled from 'styled-components';
import { DRAG_ITEMS, WHOLE_SIZE, TEMP_WIDGET } from '../config/Drag';
import { DEFAULT_DATA } from '../config';
export default function Item({ widget, moveWidget, path }) {
  const [dragCollectProps, drag] = useDrag({
    item: { type: DRAG_ITEMS.DISPLAY_ITEM, id: widget.id, path, widget },
    collect(monitor) {
      return { isDragging: monitor.isDragging() };
    },
  });
  const width = `${(widget.size * 100) / WHOLE_SIZE}%`;
  if (widget.type === TEMP_WIDGET) return <li className="tempWidget" style={{ width }}></li>;
  const { isDragging } = dragCollectProps;
  const { controlName } = DEFAULT_DATA[widget.type] || {};
  return (
    <li key={widget.id} ref={drag} style={{ width }}>
      <div className="contentWrap">
        <div className="content">
          {controlName}
          {isDragging && <div className="mask"></div>}
        </div>
      </div>
    </li>
  );
}
