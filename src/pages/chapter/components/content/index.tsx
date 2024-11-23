import React from 'react';

import { useRequest } from '@/hooks/useRequest';

import api from '@/pages/chapter/api';

import { NIGHT_THEME, NIGHT_THEME_TEXT_COLOR } from '@/pages/chapter/constants';

import { chapterActions } from '@/pages/chapter/store';

import styles from './index.module.scss';
import { IBookInfo, IChapterInfo } from '@/types/book';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '@/components/loading';
import { Button, ErrorBlock } from '@/bases';
import { useAppDispatch, useAppSelector } from '@/store';

const ChapterContent: React.FC = React.memo(() => {
  const { bookId, chapterId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const theme = useAppSelector<string>((state) => state.chapter.theme);
  const fontSize = useAppSelector<number>((state) => state.chapter.fontSize);
  const nightTheme = useAppSelector<boolean>((state) => state.chapter.nightTheme);
  const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);
  const footerNavBarVisible = useAppSelector<boolean>((state) => state.chapter.footerNavBarVisible);

  const contentRef = React.useRef<HTMLDivElement>(null);

  const { data } = useRequest<IBookInfo>({ url: api.getBook(bookId as string) });
  const { error, data: chapters } = useRequest<IChapterInfo[]>({
    url: api.getChapter(bookId as string, chapterId as string),
  });

  const isFirst = Number(chapterId) === 1;
  const isLast = Number(chapterId) === data?.chapters!.length;

  const onContent = () => {
    dispatch(chapterActions.setHeaderVisible(!headerVisible));
    dispatch(chapterActions.setFooterNavBarVisible(!footerNavBarVisible));
    dispatch(chapterActions.setFooterProgressBarVisible(false));
    dispatch(chapterActions.setFooterSettingBarVisible(false));
  };

  const renderChapter = (chapterInfo: IChapterInfo) => {
    return (
      <div key={chapterInfo.chapterId}>
        <h1>{chapterInfo.chapterName}</h1>
        {chapterInfo.content.map((item) => {
          return <p key={item}>{item}</p>;
        })}
      </div>
    );
  };

  const onPrev = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isFirst) return;
    navigate(`/book/${bookId}/${Number(chapterId) - 1}`, { replace: true });
  };

  const onNext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isLast) return;
    navigate(`/book/${bookId}/${Number(chapterId) + 1}`, { replace: true });
  };

  React.useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    element.scrollTop = 0;
  }, [chapterId]);

  if (!chapters) {
    return <Loading />;
  }

  if (error || !chapters?.length) {
    return <ErrorBlock />;
  }

  return (
    <div
      className={styles.content}
      onClick={onContent}
      ref={contentRef}
      style={{
        background: nightTheme ? NIGHT_THEME : theme,
        fontSize: fontSize,
        color: nightTheme ? NIGHT_THEME_TEXT_COLOR : '',
      }}
    >
      {chapters.map((chapterInfo: IChapterInfo) => renderChapter(chapterInfo))}

      <div className={styles.pagination}>
        <Button onClick={onPrev} disabled={isFirst}>
          上一章
        </Button>
        <Button onClick={onNext} disabled={isLast}>
          下一章
        </Button>
      </div>
    </div>
  );
});

export default ChapterContent;
