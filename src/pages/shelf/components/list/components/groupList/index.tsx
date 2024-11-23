import { Grid, Popup } from '@/bases';
import BookCover from '@/components/bookCover';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { useAppDispatch, useAppSelector } from '@/store';
import { IBookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';
import React from 'react';
import cx from 'classnames';
import BookList from '@/pages/shelf/components/list/components/bookList';

import styles from './index.module.scss';
import { shelfActions } from '@/pages/shelf/store';

const GroupList: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);
  const selectedGroup = useAppSelector<string[]>((state) => state.shelf.selectedGroup);
  const groupList = useReadLocalStorage<Record<string, IBookInfo[]>>('shelf-group') || {};

  const [visible, setVisible] = React.useState<boolean>(false);
  const [bookList, setBookList] = React.useState<IBookInfo[]>([]);

  const getGroupActice = (groupName: string) => {
    const index = selectedGroup.findIndex((name) => name === groupName);
    return index === -1 ? false : true;
  };

  const onGroup = (groupName: string) => {
    if (editMode) {
      dispatch(shelfActions.setSelectedGroup(groupName));
    } else {
      setVisible(true);
      setBookList(groupList[groupName]);
    }
  };

  return (
    <>
      {Object.keys(groupList).map((groupName: string) => (
        <Grid.Item key={groupName} onClick={() => onGroup(groupName)}>
          <div className={styles.group}>
            <Grid columns={2} gap={px2rem(5)}>
              {groupList[groupName].map((book) => (
                <Grid.Item key={book.bookId}>
                  <BookCover
                    src={book.coverImg}
                    alt={book.title}
                    style={{ '--width': px2rem(40), '--height': px2rem(57) }}
                  />
                </Grid.Item>
              ))}
            </Grid>
            {editMode && (
              <i className={cx('icon-selector', styles.icon, { [styles.active]: getGroupActice(groupName) })} />
            )}
          </div>
          <div className={styles.groupName}>{groupName}</div>
        </Grid.Item>
      ))}
      <Popup visible={visible} position="bottom" className={styles.groupPopup} onMaskClick={() => setVisible(false)}>
        <Grid columns={3} gap={px2rem(20)}>
          <BookList bookList={bookList} />
        </Grid>
      </Popup>
    </>
  );
});

export default GroupList;
