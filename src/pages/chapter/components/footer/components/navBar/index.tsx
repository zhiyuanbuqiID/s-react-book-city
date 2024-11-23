import React from 'react';
import { Popup, Grid } from '@/bases';

import { chapterActions } from '@/pages/chapter/store';

import { useAppSelector, useAppDispatch } from '@/store';

import styles from './index.module.scss';

const NavBar: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const footerNavBarVisible = useAppSelector<boolean>((state) => state.chapter.footerNavBarVisible);
  const nightTheme = useAppSelector<boolean>((state) => state.chapter.nightTheme);

  const onCatalog = () => {
    dispatch(chapterActions.setCatalogVisible(true));
  };

  const onProgress = () => {
    dispatch(chapterActions.setFooterProgressBarVisible(true));
  };

  const onSetting = () => {
    dispatch(chapterActions.setFooterSettingBarVisible(true));
  };

  const onNightTheme = () => {
    dispatch(chapterActions.setNightTheme(!nightTheme));
  };

  return (
    <Popup position="bottom" visible={footerNavBarVisible} mask={false}>
      <div className={styles.navBar}>
        <Grid columns={4}>
          <div className={styles.item} onClick={onCatalog}>
            <div className={styles.icon}>
              <i className="icon-catalog" />
            </div>
            <div className={styles.name}>目录</div>
          </div>

          <div className={styles.item} onClick={onProgress}>
            <div className={styles.icon}>
              <i className="icon-progress" />
            </div>
            <div className={styles.name}>进度</div>
          </div>

          <div className={styles.item} onClick={onSetting}>
            <div className={styles.icon}>
              <i className="icon-setting" />
            </div>
            <div className={styles.name}>设置</div>
          </div>

          <div className={styles.item} onClick={onNightTheme}>
            <div className={styles.icon}>
              {nightTheme ? <i className="icon-daytime" /> : <i className="icon-night" />}
            </div>
            <div className={styles.name}>{nightTheme ? '日间' : '夜间'}</div>
          </div>
        </Grid>
      </div>
    </Popup>
  );
});

export default NavBar;
