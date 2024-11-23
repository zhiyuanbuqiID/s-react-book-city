import React from 'react';

import SearchBar from '@/pages/search/components/searchBar';
import SearchList from '@/pages/search/components/searchList';
import SearchHot from '@/pages/search/components/searchHot';
import SearchHistory from '@/pages/search/components/searchHistory';

import { createReducer } from '@/pages/search/store';

import { useReducer } from '@/store';

import styles from './index.module.scss';

const Search: React.FC = () => {
  const { reducers } = React.useMemo(() => createReducer('search'), []);
  useReducer(reducers);

  return (
    <div className={styles.search}>
      <SearchBar />
      <SearchHot />
      <SearchHistory />
      <SearchList />
    </div>
  );
};

export default Search;
