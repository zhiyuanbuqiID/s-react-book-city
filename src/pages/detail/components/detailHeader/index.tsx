import React from 'react';

import { Divider } from '@/bases';

import DetailNavBar from '@/pages/detail/components/detailHeader/components/detailNavBar';
import DetailBookInfo from '@/pages/detail/components/detailHeader/components/detailBookInfo';
import DetailBookCatalog from '@/pages/detail/components/detailHeader/components/detailBookCatalog';

import styles from './index.module.scss';

const DetailHeader: React.FC = React.memo(() => {
  return (
    <div className={styles.header}>
      <DetailNavBar />
      <DetailBookInfo />
      <Divider />
      <DetailBookCatalog />
    </div>
  );
});

export default DetailHeader;
