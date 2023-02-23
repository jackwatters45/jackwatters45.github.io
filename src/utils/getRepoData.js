import toTitleCase from './toTitleCase';

const getRepoData = (repo) => {
  const id = repo.name;
  const name = toTitleCase(id);
  const desc = repo.description;
  const lastUpdate = new Date(repo.pushed_at);
  const repoUrl = repo.svn_url;
  const createdTime = new Date(repo.created_at);
  const url = `https://jackwatters45.github.io/${id}/`;
  const month = `${createdTime.getMonth() + 1}/${createdTime.getFullYear()}`;

  return { id, name, desc, lastUpdate, repoUrl, createdTime, url, month };
};

export default getRepoData;
