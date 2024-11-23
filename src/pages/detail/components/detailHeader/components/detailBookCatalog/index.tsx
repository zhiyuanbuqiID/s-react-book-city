import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Space, Popup } from '@/bases';

import { useRequest } from '@/hooks/useRequest';
import BookCatalogList from '@/components/bookCatalogList';
import api from '@/pages/detail/api';
import { IBookInfo } from '@/types/book';

import styles from './index.module.scss';

const DetailBookCatalog: React.FC = React.memo(() => {
  const id = useParams().id as string;
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState<boolean>(false);
  const { data } = useRequest<IBookInfo>({ url: api.getBook(id) });

  const threeChapters = React.useMemo(() => {
    return data!.chapters!.slice(-3).reverse();
  }, [data]);

  const onShow = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onClickChapter = (chapter: number) => {
    navigate(`/book/${data!.bookId}/${chapter}`);
  };

  return (
    <div className={styles.catalog}>
      <Space direction="vertical">
        {threeChapters.map((name: string) => (
          <div className={styles.catalogItem} key={name}>
            {name}
          </div>
        ))}
      </Space>

      <div className={styles.catalogBtn} onClick={onShow}>
        <div className={styles.icon}>
          <i className="icon-catalog" />
        </div>
        <div>目录</div>
      </div>

      <Popup visible={visible} onMaskClick={onCancel}>
        <BookCatalogList
          catalogList={data!.chapters!}
          author={data!.author}
          title={data!.title}
          imgUrl={data!.coverImg}
          bookId={data!.bookId}
          onClickChapter={onClickChapter}
        />
      </Popup>
    </div>
  );
});

export default DetailBookCatalog;
