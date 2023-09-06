import { Octokit } from '@octokit/rest';
import { useCallback, useState } from 'react';
import convertDate from './misc/convertDate';
import SearchBar from './components/SearchBar';
import './styles/App.scss';

const octokit = new Octokit({
  auth: process.env.REACT_APP_TOKEN,
});

function App() {
  const [searchResults, setSearchResults] = useState('');
  const [repoData, setRepoData] = useState([]);

  const fetchRepos = useCallback(async (userName) => {
    try {
      const response = await octokit.repos.listForUser({
        username: userName,
      });

      if (response.status === 200) {
        setRepoData(response.data.map((repo) => ({
          name: repo.name,
          id: repo.id,
          lang: repo.language,
          topics: repo.topics,
          forks: repo.forks_count,
          desc: repo.description,
          /* Setting the avatar here. We can use another state
          to manage it tho */
          userAvatar: repo.owner.avatar_url,
          stars: repo.stargazers_count,
          created_at: convertDate(repo.created_at),
          updated_at: convertDate(repo.updated_at),
        })));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  const handleQuery = useCallback((query) => {
    if (query) { setSearchResults(query); }
  }, []);

  const getSearchResults = useCallback(() => {
    fetchRepos(searchResults);
  }, [fetchRepos, searchResults]);
  // eslint-disable-next-line no-console
  console.log(repoData);

  return (
    <div className="App">
      <SearchBar
        searchResults={searchResults}
        handleQuery={handleQuery}
        getSearchResults={getSearchResults}
      />
    </div>
  );
}

export default App;
