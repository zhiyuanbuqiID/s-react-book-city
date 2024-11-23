import React from 'react';
import { Grid } from '@/bases';

import BookList from '@/pages/shelf/components/list/components/bookList';
import GroupList from '@/pages/shelf/components/list/components/groupList';

import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { IBookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';

const List: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const bookList = useReadLocalStorage<IBookInfo[]>('shelf') || [];

  const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);

  return (
    <div className={styles.list}>
      <Grid columns={3} gap={px2rem(20)}>
        <GroupList />
        <BookList bookList={bookList} />
        {!editMode && (
          <Grid.Item onClick={() => navigate('/')}>
            <div className={styles.addBook}>
              <i className="icon-add" />
            </div>
          </Grid.Item>
        )}
      </Grid>
    </div>
  );
});

export default List;
