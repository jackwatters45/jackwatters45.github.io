import React from 'react';
import Todo from './Todo';
import styled from 'styled-components';

// TODO width
const ProjectContainer = styled.div`
  margin: 4px;
  width: 180px;
  background-color: var(--section-background-color);
  height: fit-content;
  border-radius: 4px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 24px;
  width: inherit;
  align-items: center;
  padding: 4px;
  margin-bottom: 2px;
`;

const ProjectTitle = styled.p`
  width: fit-content;
  border-radius: 4px;
  background-color: var(--card-background-color);
  padding: 0 6px;
`;

const Project = ({ data }) => {
  const { month, repos } = data;
  return (
    <ProjectContainer>
      <Header>
        <ProjectTitle>{month}</ProjectTitle>
      </Header>
      {repos.map((repo) => (
        <Todo key={repo.name} data={repo} />
      ))}
    </ProjectContainer>
  );
};

export default Project;
