import React from 'react';

import RankingHeader from '@/pages/ranking/components/header';
import RankingContent from '@/pages/ranking/components/content';
import { createReducer } from '@/pages/ranking/store';

import { ErrorBlock } from '@/bases';
import Loading from '@/components/loading';
import { useRequest } from '@/hooks/useRequest';
import api from '@/pages/ranking/api';

import { useReducer } from '@/store';

import styles from './index.module.scss';

const Ranking: React.FC = () => {
  const { data, error } = useRequest({ url: api.ranking });
  const { reducers } = React.useMemo(() => createReducer('ranking'), []);
  useReducer(reducers);

  console.log(data);

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.ranking}>
      <RankingHeader />
      <RankingContent />
    </div>
  );
};

export default Ranking;
