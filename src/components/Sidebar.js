import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import toTitleCase from '../utils/toTitleCase';
import {
  mdiChevronRight,
  mdiClockTimeNineOutline,
  mdiLinkVariant,
  mdiCalendarMonth,
} from '@mdi/js';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  display: grid;
  grid-template-columns: 5px auto;
  grid-template-rows: 36px auto 1fr;
  margin-left: auto;
  background: rgb(32, 32, 32);
  box-shadow: rgba(15, 15, 15, 0.05) 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px,
    rgba(15, 15, 15, 0.2) 0px 9px 24px;
  height: 100%;
`;

const CloseButton = styled(Icon)`
  margin: 4px 4px 4px 0;
  cursor: pointer;
  grid-column: 2;
  &:hover {
    background-color: rgba(255, 255, 255, 0.055);
    border-radius: 4px;
  }
`;

const PropertiesContainer = styled.div`
  display: grid;
  grid-template-columns: 140px auto;
  grid-template-rows: repeat(5, auto);
  padding: 48px 48px 12px 48px;
  grid-column: 2;
  // width: inherit;
  > * {
    display: flex;
    align-items: start;
    gap: 8px;
  }
`;

const PropertyLabel = styled.div`
  margin: 5px 0;
  height: 30px;
`;

const TodoName = styled.div`
  width: fit-content;
  margin: 0 0 10px 0;
  font-size: 30px;
  font-weight: 700;
  grid-column: 1 / -1;
  word-break: break-word;
  display: inline-block;
`;

const PropertyValue = styled.p`
  padding: 0 5px;
  margin: 5px 0;
`;

const PropertyValueLink = styled.a`
  padding: 0 5px;
  margin: 5px 0;
  cursor: pointer;
  height: fit-content;
  word-break: break-word;
  display: inline-block;
  &: hover {
    background-color: rgba(255, 255, 255, 0.055);
    border-radius: 4px;
  }
`;

const NotesContainer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0px;
  align-self: flex-start;
  padding: 0 48px;
  height: 95%;
`;

const Notes = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  background-color: inherit;
  font: inherit;
  color: var(--main-font-color);
`;

const EmptyNotes = styled.p`
  color: var(--secondary-font-color);
`;

const Dragger = styled.div`
  grid-row: 1 /-1;
  cursor: col-resize;
`;

const Sidebar = ({ isSidebarVisible, closeSidebar, todo }) => {
  // STACK OVERFLOW - resizing sidebar
  // https://codereview.stackexchange.com/questions/263970/react-based-resizable-sidebar
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(400);

  const stopResizing = useCallback(() => setIsResizing(false), []);
  const startResizing = useCallback(() => setIsResizing(true), []);
  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing)
        setSidebarWidth(
          Math.min(
            Math.max(
              400,
              sidebarRef.current.getBoundingClientRect().right -
                mouseMoveEvent.clientX,
            ),
            document.body.clientWidth * (2 / 3),
          ),
        );
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const formatDate = (date) =>
    `${date.toDateString()} ${date.toLocaleTimeString()}`;

  if (isSidebarVisible) {
    return (
      <SidebarContainer
        className="sidebar"
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
      >
        <Dragger onMouseDown={startResizing} />
        <CloseButton onClick={closeSidebar} path={mdiChevronRight} size={1} />
        <PropertiesContainer>
          <TodoName>{toTitleCase(todo.name)}</TodoName>
          <PropertyLabel>
            <Icon path={mdiLinkVariant} size={0.75} />
            <p>Repo</p>
          </PropertyLabel>
          <PropertyValueLink href={todo.repoUrl}>
            {todo.repoUrl}
          </PropertyValueLink>
          <PropertyLabel>
            <Icon path={mdiLinkVariant} size={0.75} />
            <p>Live Project</p>
          </PropertyLabel>
          <PropertyValueLink href={todo.url}>{todo.url}</PropertyValueLink>
          <PropertyLabel>
            <Icon path={mdiCalendarMonth} size={0.75} />
            <p>Created Time</p>
          </PropertyLabel>
          <PropertyValue>{formatDate(todo.createdTime)}</PropertyValue>
          <PropertyLabel>
            <Icon path={mdiClockTimeNineOutline} size={0.75} />
            <p>Last Updated</p>
          </PropertyLabel>
          <PropertyValue>{formatDate(todo.lastUpdate)}</PropertyValue>
        </PropertiesContainer>
        <NotesContainer style={{ width: sidebarWidth - 5 }}>
          <hr />
          <Notes>
            {todo.desc || <EmptyNotes>{'No description yet...'}</EmptyNotes>}
          </Notes>
        </NotesContainer>
      </SidebarContainer>
    );
  }
};

export default Sidebar;
