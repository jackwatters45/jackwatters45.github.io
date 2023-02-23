import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Project from './Project';
import { Octokit } from 'octokit';
import getRepoData from '../utils/getRepoData';
import Sidebar from './Sidebar';

const MainContentContainer = styled.div`
  display: flex;
  height: fit-content;
  margin: 0 0 0 50px;
  overflow: auto;
`;

const ProjectContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

export const SidebarContext = createContext({});

const MainContent = () => {
  const [reposData, setReposData] = useState([]);
  useEffect(() => {
    const octokit = new Octokit({
      auth: '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',
    });

    try {
      const getRepos = async () => {
        if (reposData.length) return;
        const reposResponse = await octokit.request('GET /users/{user}/repos', {
          user: 'jackwatters45',
        });

        console.log(reposResponse)
        await reposResponse.data.forEach((repo) =>
          setReposData((prev) => [...prev, getRepoData(repo)]),
        );
      };
      getRepos();
    } catch (e) {
      console.log(e);
    }
  }, [reposData.length]);

  const [projectMonth, setProjectMonth] = useState([]);
  useEffect(() => {
    const reposCopy = [...reposData];
    reposCopy.sort((a, b) => b.createdTime - a.createdTime);

    const months = new Set(reposCopy.map((repo) => repo.month));

    months.forEach((month) => {
      const reposMonth = reposCopy.filter((repo) => repo.month === month);

      setProjectMonth((prev) => [...prev, { month, repos: reposMonth }]);
    });
  }, [reposData]);

  useEffect(()=> {console.log(reposData)})

  const [selectedTodo, setSelectedTodo] = useState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = (todo) => {
    // TODO not sure if need change -> if (!todo.name) return;

    if (isSidebarVisible) return setIsSidebarVisible(false); // TODO check if different card clicked
    setIsSidebarVisible(true);
    setSelectedTodo(todo);
  };
  const closeSidebar = () => setIsSidebarVisible(false);

  return (
    <MainContentContainer>
      <SidebarContext.Provider
        value={{ isSidebarVisible, closeSidebar, selectedTodo, toggleSidebar }}
      >
        <ProjectContainer>
          {projectMonth &&
            projectMonth.map((project) => (
              <Project key={project.month} data={project} v />
            ))}
        </ProjectContainer>
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          closeSidebar={closeSidebar}
          todo={selectedTodo}
        />
      </SidebarContext.Provider>
    </MainContentContainer>
  );
};

export default MainContent;
