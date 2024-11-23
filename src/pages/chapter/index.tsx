import React from 'react';

import ChapterHeader from '@/pages/chapter/components/header';
import ChapterContent from '@/pages/chapter/components/content';
import ChapterFooter from '@/pages/chapter/components/footer';

import { createReducer } from '@/pages/chapter/store';
import { useReducer } from '@/store';

const Chapter: React.FC = () => {
  const { reducers } = React.useMemo(() => createReducer('chapter'), []);
  useReducer(reducers);

  return (
    <>
      <ChapterHeader />
      <ChapterContent />
      <ChapterFooter />
    </>
  );
};

export default Chapter;
