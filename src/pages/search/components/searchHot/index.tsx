import React from 'react';
import cx from 'classnames';

import { Space } from '@/bases';

import useRequest from '@/hooks/useRequest/useRequest';

import api from '@/pages/search/api';
import { setHistory } from '@/pages/search/utils';
import { searchActions } from '@/pages/search/store';
import { useAppSelector, useAppDispatch } from '@/store';

import { setUrlParams } from '@/utils/url';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const SearchHot: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const searchMode = useAppSelector<boolean>((state) => state.search.searchMode);
  const { data, error } = useRequest<string[]>({ url: api.getHotSearch });

  const onSearch = (e: React.MouseEvent) => {
    const keyword = (e.target as HTMLElement).dataset['keyword'] as string;
    setHistory(keyword);
    setUrlParams([['keyword', keyword]], '/search');
    dispatch(searchActions.setSearchMode(true));
    dispatch(searchActions.setSearchKeyword(keyword));
  };

  if (!data || error) {
    return null;
  }

  return (
    <div className={cx(styles.searchHot, { [styles.hidden]: searchMode })}>
      <div className={styles.title}>热门搜索</div>
      <div className={styles.searchTags}>
        <Space wrap gap={[px2rem(20), px2rem(10)]}>
          {data.map((item, index) => (
            <div key={index} className={styles.tag} data-keyword={item} onClick={onSearch}>
              {item}
            </div>
          ))}
        </Space>
      </div>
    </div>
  );
});

export default SearchHot;
