import React from 'react';

import ShelfNavBar from '@/pages/shelf/components/navBar';
import ShelfList from '@/pages/shelf/components/list';
import ShelfEditBar from '@/pages/shelf/components/editBar';

import createReducer from '@/pages/shelf/store';

import { useReducer } from '@/store';

const Shelf: React.FC = () => {
  const { reducers } = React.useMemo(() => createReducer('shelf'), []);
  useReducer(reducers);

  return (
    <>
      <ShelfNavBar />
      <ShelfList />
      <ShelfEditBar />
    </>
  );
};

export default Shelf;
