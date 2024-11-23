import React from 'react';

import { ErrorBlock, Swiper, Space, Image } from '@/bases';
import Loading from '@/components/loading';
import Navbar from '@/pages/home/components/navbar';
import Header from '@/pages/home/components/header';
import Popular from '@/pages/home/components/popular';
import Recommend from '@/pages/home/components/recommend';
import LimitedRead from '@/pages/home/components/limitedRead';
import Ranking from '@/pages/home/components/ranking';

import { useRequest } from '@/hooks/useRequest';

import api from '@/pages/home/api';
import { IHomeData } from '@/pages/home/types';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const Home: React.FC = () => {
  const { data, error } = useRequest<IHomeData>({ url: api.getHomeData });

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.home}>
      <Header />
      <Space direction="vertical" gap={px2rem(20)}>
        <Swiper loop autoplay style={{ '--border-radius': '12px' }}>
          {data!.banner.map((item, index) => (
            <Swiper.Item key={index}>
              <Image src={item.src} alt={item.alt} />
            </Swiper.Item>
          ))}
        </Swiper>
        <Navbar />
        <Popular />
        <Recommend />
        <LimitedRead />
        <Ranking />
      </Space>
    </div>
  );
};

export default Home;
