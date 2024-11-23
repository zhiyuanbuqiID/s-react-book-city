import React from 'react';
import cx from 'classnames';
import { Popup, Grid, Slider } from '@/bases';

import { chapterActions } from '@/pages/chapter/store';
import { THEME } from '@/pages/chapter/constants';

import { useAppSelector, useAppDispatch } from '@/store';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const SettingBar: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const footerSettingBarVisible = useAppSelector<boolean>((state) => state.chapter.footerSettingBarVisible);
  const theme = useAppSelector<string>((state) => state.chapter.theme);
  const onChange = (value: number) => {
    dispatch(chapterActions.setFontSize(value));
  };

  const onChangeAfter = (value: number) => {
    dispatch(chapterActions.setFontSize(value));
  };

  const onSetTheme = (theme: string) => {
    dispatch(chapterActions.setTheme(theme));
    dispatch(chapterActions.setNightTheme(false));
  };

  return (
    <Popup position="bottom" visible={footerSettingBarVisible} mask={false}>
      <div className={styles.settingBar}>
        <div className={styles.setFont}>
          <div className={styles.text}>A-</div>
          <div className={styles.slider}>
            <Slider onChange={onChange} onChangeAfter={onChangeAfter} min={14} max={28} />
          </div>
          <div className={styles.text}>A+</div>
        </div>
        <div className={styles.setTheme}>
          <Grid columns={4} gap={px2rem(20)}>
            {THEME.map((item) => (
              <Grid.Item key={item}>
                <div
                  style={{ background: item }}
                  className={cx(styles.selector, { [styles.active]: item === theme })}
                  onClick={() => onSetTheme(item)}
                />
              </Grid.Item>
            ))}
          </Grid>
        </div>
      </div>
    </Popup>
  );
});

export default SettingBar;
