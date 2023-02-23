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
    const octokit = new Octokit();
    try {
      const getRepos = async () => {
        const reposResponse = await octokit.request('GET /users/{user}/repos', {
          user: 'jackwatters45',
        });

        await reposResponse.data.forEach((repo) =>
          setReposData((prev) => [...prev, getRepoData(repo)]),
        );
      };
      getRepos();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [projectMonth, setProjectMonth] = useState([]);
  useEffect(() => {
    if (!reposData) return;

    const reposCopy = [...reposData];
    reposCopy.sort((a, b) => b.createdTime - a.createdTime);

    const months = new Set(reposCopy.map((repo) => repo.month));
    months.forEach((month) => {
      const reposMonth = reposCopy.filter((repo) => repo.month === month);
      setProjectMonth((prev) => [...prev, { month, repos: reposMonth }]);
    });
  }, [reposData]);

  const [selectedTodo, setSelectedTodo] = useState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const closeSidebar = () => setIsSidebarVisible(false);
  const toggleSidebar = (e, todo) => {
    const isCurrentlyOpen = () =>
      isSidebarVisible &&
      (e.target.outerHTML.includes(selectedTodo.name) ||
        e.target.parentElement.outerHTML.includes(selectedTodo.name));
    if (isCurrentlyOpen()) return setIsSidebarVisible(false);

    setIsSidebarVisible(true);
    setSelectedTodo(todo);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (
        isSidebarVisible &&
        !e.target.closest('.sidebar') &&
        !e.target.className.includes('card') &&
        !e.target.parentElement.className.includes('card')
      )
        setIsSidebarVisible(false);
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isSidebarVisible]);

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
