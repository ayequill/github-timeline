/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useCallback, useState } from 'react';
import SearchBar from './components/SearchBar';
import './styles/App.scss';

function App() {
  const [searchResults, setSearchResults] = useState('');

  const handleQuery = useCallback((query) => {
    if (query) { setSearchResults(query); }
  }, []);

  const getSearchResults = useCallback(() => {
    console.log(searchResults);
  }, [searchResults]);

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
