import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import DisplayRow from './displayRow';

export default function WidgetPreview({ widgets, ...rest }) {
  const [collectDrop, drop] = useDrop({
    accept: 'Item',
    drop(item, monitor) {
      console.log(item, monitor.getDropResult());
    },
  });
  return (
    <div className="previewWrap" ref={drop}>
      {widgets.map((row, index) => {
        return <DisplayRow key={index} row={row} index={index} {...rest} />;
      })}
    </div>
  );
}
