import React from 'react';
import { useDrag } from 'react-dnd';
import { DEFAULT_CONFIG } from '../config';
import { DRAG_ITEMS } from '../config/Drag';

export default function DraggableItem({ item, addWidget }) {
  const { name } = DEFAULT_CONFIG[item] || {};
  const [collectDrag, drag] = useDrag({
    item: { id: item, type: DRAG_ITEMS.LIST_ITEM },
    end(obj, monitor) {
      if (monitor.didDrop()) {
        addWidget(item);
      }
    },
  });
  return (
    <li ref={drag} onClick={() => addWidget(item)}>
      <div className="content">{name}</div>
    </li>
  );
}
