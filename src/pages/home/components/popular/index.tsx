import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Space, Card, Grid } from '@/bases';
import BookCover from '@/components/bookCover';
import { useRequest } from '@/hooks/useRequest';
import { IHomeData } from '@/pages/home/types';
import api from '@/pages/home/api';

import styles from './index.module.scss';
import { px2rem } from '@/utils/unit';

const Popular: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useRequest<IHomeData>({ url: api.getHomeData });

  const renderContent = () => {
    return data?.popular.map((book) => (
      <Grid.Item key={book.bookId} onClick={() => navigate(`/book/${book.bookId}`)}>
        <Space gap={px2rem(12)}>
          <BookCover src={book.coverImg} alt={book.title} />
          <Space direction="vertical" justify="between" gap={px2rem(12)}>
            <div className={styles.bookName}>{book.title}</div>
            <div className={styles.desc}>{book.desc}</div>
            <div className={styles.meta}>
              {book.author}·{book.categoryName}
            </div>
          </Space>
        </Space>
      </Grid.Item>
    ));
  };

  const onHeaderClick = () => {
    navigate('/book-list/popular');
  };

  return (
    <div className={styles.popular}>
      <Card title="热门精选" extra="更多" onHeaderClick={onHeaderClick} headerClassName={styles.header}>
        <Grid columns={1} gap={px2rem(24)}>
          {renderContent()}
        </Grid>
      </Card>
    </div>
  );
};

export default Popular;
