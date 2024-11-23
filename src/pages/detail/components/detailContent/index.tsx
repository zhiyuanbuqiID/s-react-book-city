import React from 'react';
import { useParams } from 'react-router-dom';

import useRequest from '@/hooks/useRequest/useRequest';
import api from '@/pages/detail/api';
import { IBookInfo, IChapterInfo } from '@/types/book';

import styles from './index.module.scss';

const DetailContent: React.FC = React.memo(() => {
  const id = useParams().id as string;
  const { data } = useRequest<IBookInfo>({ url: api.getBook(id) });

  const chapterInfo = data!.chapterInfo as IChapterInfo;

  return (
    <div className={styles.detailContent}>
      <h1>{chapterInfo.chapterName}</h1>
      {chapterInfo.content.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
});

export default DetailContent;
