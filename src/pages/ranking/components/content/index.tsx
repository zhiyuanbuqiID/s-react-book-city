import React from 'react';
import { Sidebar } from '@/bases';

import { useRequest } from '@/hooks/useRequest';
import api from '@/pages/ranking/api';

import { IRanking } from '@/pages/ranking/types';
import { TAB_DEFAULT_KEY } from '@/pages/ranking/constants';
import BookList from '@/pages/ranking/components/booklist';

import { useAppSelector } from '@/store';

import styles from './index.module.scss';

const RankingContent: React.FC = React.memo(() => {
  const { data } = useRequest<IRanking>({ url: api.ranking });
  const selectedTabKey = useAppSelector<'male' | 'female'>((state) => state.ranking.activeTabKey);
  const [activeKey, setActiveKey] = React.useState<string>(data![TAB_DEFAULT_KEY][0].key);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.rankingContent}>
      <Sidebar activeKey={activeKey} onChange={onChange}>
        {data![selectedTabKey].map((item) => (
          <Sidebar.Item key={item.key} title={item.shortTitle}>
            <BookList id={activeKey} gender={selectedTabKey} />
          </Sidebar.Item>
        ))}
      </Sidebar>
    </div>
  );
});

export default RankingContent;
