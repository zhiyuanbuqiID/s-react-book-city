import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Space } from '@/bases';
import BookCover from '@/components/bookCover';
import { shelfActions } from '@/pages/shelf/store';

import { useAppDispatch, useAppSelector } from '@/store';
import { IBookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

export interface IBookList {
  bookList: IBookInfo[];
}

const BookList: React.FC<IBookList> = React.memo((props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);
  const selectedBook = useAppSelector<IBookInfo[]>((state) => state.shelf.selectedBook);

  const onBook = (book: IBookInfo) => {
    if (!editMode) {
      navigate(`/book/${book.bookId}`);
    } else {
      dispatch(shelfActions.setSelectedBook(book));
    }
  };

  const getBookActive = (bookId: string) => {
    const index = selectedBook.findIndex((item) => bookId === item.bookId);
    return index === -1 ? false : true;
  };

  return (
    <>
      {props.bookList.map((book) => (
        <React.Fragment key={book.bookId}>
          <Grid.Item onClick={() => onBook(book)}>
            <BookCover
              src={book.coverImg}
              alt={book.title}
              style={{ '--width': px2rem(96), '--height': px2rem(130) }}
              editMode={editMode}
              active={getBookActive(book.bookId)}
            />
            <Space direction="vertical" gap={px2rem(6)}>
              <div className={styles.bookName}>{book.title}</div>
              <div className={styles.author}>{book.author}</div>
            </Space>
          </Grid.Item>
        </React.Fragment>
      ))}
    </>
  );
});

export default BookList;
