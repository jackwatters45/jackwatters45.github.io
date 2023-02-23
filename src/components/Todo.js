import React, { useContext } from 'react';
import styled from 'styled-components';
import { SidebarContext } from './MainContent';

const TodoContainer = styled.div`
  padding: 10px 10px 6px 10px;
  background-color: var(--card-background-color);
  height: fit-content;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
`;

const TodoName = styled.div`
  background-color: var(--card-background-color);
  // padding: 0 0 6px 0;
  word-wrap: break-word;
  word-break: break-all;
`;

const TodoCreatedDate = styled.div`
  font-size: 12px;
`;

const Todo = ({ data }) => {
  const { toggleSidebar } = useContext(SidebarContext);
  const { name, createdTime } = data;
  return (
    <TodoContainer onClick={() => toggleSidebar(data)}>
      <TodoName>{name}</TodoName>
      <TodoCreatedDate>Created: {createdTime.toDateString()}</TodoCreatedDate>
    </TodoContainer>
  );
};

export default Todo;
