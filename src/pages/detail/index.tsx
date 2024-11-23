import React from 'react';
import { useParams } from 'react-router-dom';

import { ErrorBlock } from '@/bases';
import Loading from '@/components/loading';

import useRequest from '@/hooks/useRequest/useRequest';
import { IBookInfo } from '@/types/book';

import DetailHeader from '@/pages/detail/components/detailHeader';
import DetailFooter from '@/pages/detail/components/detailFooter';
import DetailContent from '@/pages/detail/components/detailContent';

import api from '@/pages/detail/api';

const Detail: React.FC = () => {
  const id = useParams().id as string;
  const { data, error } = useRequest<IBookInfo>({ url: api.getBook(id) });

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <DetailHeader />
      <DetailContent />
      <DetailFooter />
    </>
  );
};

export default Detail;
