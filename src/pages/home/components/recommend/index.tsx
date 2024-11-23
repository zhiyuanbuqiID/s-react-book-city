import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Grid, Space } from '@/bases';
import useRequest from '@/hooks/useRequest/useRequest';

import api from '@/pages/home/api';
import { IHomeData } from '@/pages/home/types';

import { px2rem } from '@/utils/unit';
import BookCover from '@/components/bookCover';

import styles from './index.module.scss';

const Recommend: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { data } = useRequest<IHomeData>({ url: api.getHomeData });

  const renderContent = () => {
    return data?.recommend.map((book) => (
      <React.Fragment key={book.bookId}>
        <Grid.Item onClick={() => navigate(`/book/${book.bookId}`)}>
          <BookCover src={book.coverImg} alt={book.title} />
          <Space direction="vertical" gap={px2rem(6)}>
            <div className={styles.bookName}>{book.title}</div>
            <div className={styles.author}>{book.author}</div>
          </Space>
        </Grid.Item>
      </React.Fragment>
    ));
  };

  const onHeaderClick = () => {
    navigate('/book-list/recommend');
  };

  return (
    <div className={styles.recommend}>
      <Card title="今日推荐" extra="更多" headerClassName={styles.header} onHeaderClick={onHeaderClick}>
        <Grid columns={4} gap={px2rem(16)}>
          {renderContent()}
        </Grid>
      </Card>
    </div>
  );
});

export default Recommend;
