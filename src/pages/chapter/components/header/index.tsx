import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';

import { NavBar, Popup } from '@/bases';

import styles from './index.module.scss';

const ChapterHeader: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);

  const onGoHome = () => {
    navigate('/');
  };

  const onBack = () => {
    navigate(-1);
  };

  const rightRender = () => {
    return (
      <div className={styles.icons}>
        <i className="icon-home" onClick={onGoHome} />
      </div>
    );
  };

  return (
    <div className={styles.header}>
      <Popup position="top" visible={headerVisible} mask={false}>
        <NavBar right={rightRender()} onBack={onBack} />
      </Popup>
    </div>
  );
});

export default ChapterHeader;
