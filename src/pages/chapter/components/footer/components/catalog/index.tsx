import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Popup } from '@/bases';
import BookCatalogList from '@/components/bookCatalogList';
import { useRequest } from '@/hooks/useRequest';

import { chapterActions } from '@/pages/chapter/store';
import api from '@/pages/chapter/api';

import { IBookInfo } from '@/types/book';
import { useAppSelector, useAppDispatch } from '@/store';

const Catalog: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bookId } = useParams();
  const catalogVisible = useAppSelector<boolean>((state) => state.chapter.catalogVisible);

  const { data } = useRequest<IBookInfo>({ url: api.getBook(bookId as string) });

  const onMaskClick = () => {
    dispatch(chapterActions.setCatalogVisible(false));
  };

  const onClickChapter = (chapter: number) => {
    navigate(`/book/${bookId}/${chapter}`, { replace: true });
    dispatch(chapterActions.setCatalogVisible(false));
  };

  return (
    <Popup visible={catalogVisible} position="left" onMaskClick={onMaskClick}>
      {data && (
        <BookCatalogList
          catalogList={data!.chapters!}
          author={data!.author}
          title={data!.title}
          imgUrl={data!.coverImg}
          bookId={data!.bookId}
          onClickChapter={onClickChapter}
        />
      )}
    </Popup>
  );
});

export default Catalog;
