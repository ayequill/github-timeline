/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function SearchBar({ searchResults, handleQuery, getSearchResults }) {
  const [inputValue, setInputValue] = useState(searchResults || '');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    handleQuery(value);
  };

  const hanldeKeyUp = ((e) => {
    if (e.key === 'Enter') {
      getSearchResults();
      e.target.blur();
    }
  });

  return (
    <header className="header">
      <div className="main-wrapper">
        <div className="searchbar">
          <label htmlFor="searchInput">
            {/* Search: */}
            <input className="searchInput" id="searchInput" type="search" role="searchbox" value={inputValue} onChange={(e) => handleInputChange(e)} placeholder="Search Username" onKeyUp={(e) => hanldeKeyUp(e)} />
          </label>
          <button type="button" className="search-btn" onClick={getSearchResults}>Search</button>
        </div>
      </div>
    </header>
  );
}

SearchBar.propTypes = {
  searchResults: PropTypes.string,
  handleQuery: PropTypes.func.isRequired,
  getSearchResults: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  searchResults: null,
};
