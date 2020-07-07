import React from 'react';
import styled from 'styled-components';
import DraggableItem from './draggableItem';
import { widgets } from '../config';

const WidgetList = styled.ul`
  width: 240px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin: 0;
  padding: 0 20px;
  li {
    box-sizing: border-box;
    list-style: none;
    line-height: 36px;
    background: #f5f5f5;
    margin-top: 12px;
    padding-left: 12px;
    width: 48%;
    cursor: pointer;
  }
`;

export default function List(props) {
  return (
    <WidgetList>
      {widgets.map(item => (
        <DraggableItem key={item} item={item} {...props} />
      ))}
    </WidgetList>
  );
}
