import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { isEqual, throttle, includes } from 'lodash';
import { DRAG_ITEMS } from '../config/Drag';
import DisplayItem from './displayItem';
import { useRef } from 'react';

const DisplayRowWrap = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  li {
    box-sizing: border-box;
    list-style: none;
    line-height: 36px;
    height: 36px;
    padding-right: 12px;
    margin-top: 12px;
    &.tempWidget {
      background: #f0f0f0;
    }
    .contentWrap {
      position: relative;
      background: #f5f5f5;
      border-radius: 3px;
      border: 1px solid #f0f0f0;
    }
    .content {
      padding-left: 12px;
      position: relative;
    }

    .mask {
      position: absolute;
      top: 0;
      width: 100%;
      height: 36px;
      background: #f8f8f8;
    }
    .dragging {
      background: #999;
    }
  }
`;
export default function DisplayRow({ row, moveWidget, index, ...rest }) {
  const $ref = useRef(null);
  const throttleFn = (...args) => throttle(() => moveWidget(...args))();

  const [dropCollect, drop] = useDrop({
    accept: DRAG_ITEMS.DISPLAY_ITEM,
    hover(item, monitor) {
      const srcItem = monitor.getItem();
      if (includes(row, item => item.id === srcItem.id)) return;
      const { x: clientX, y: clientY } = monitor.getClientOffset();
      const $hoverEle = $ref.current;
      if (!$hoverEle) return;
      const { right, width, bottom, height } = $hoverEle.getBoundingClientRect();
      if (clientY < bottom - height / 2) {
        throttleFn({ srcItem, hoverPath: index });
        return;
      }
      // if (clientX < right - width / 2) {
      //   throttleFn({ srcItem, hoverPath: path }, 'left');
      //   return;
      // }
    },
  });
  drop($ref);
  return (
    <ul ref={$ref}>
      <DisplayRowWrap>
        {row.map((widget, columnIndex) => (
          <DisplayItem key={widget.id} widget={widget} path={[index, columnIndex]} {...rest} />
        ))}
      </DisplayRowWrap>
    </ul>
  );
}
