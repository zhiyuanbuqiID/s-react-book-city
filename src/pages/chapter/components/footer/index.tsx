import React from 'react';

import ChapterFooterNavBar from '@/pages/chapter/components/footer/components/navBar';
import ChapterFooterSettingBar from '@/pages/chapter/components/footer/components/settingBar';
import ChapterFooterProgressBar from '@/pages/chapter/components/footer/components/progressBar';
import ChapterFooterCatalog from '@/pages/chapter/components/footer/components/catalog';

const ChapterFooter: React.FC = React.memo(() => {
  return (
    <>
      <ChapterFooterNavBar />
      <ChapterFooterSettingBar />
      <ChapterFooterProgressBar />
      <ChapterFooterCatalog />
    </>
  );
});

export default ChapterFooter;
