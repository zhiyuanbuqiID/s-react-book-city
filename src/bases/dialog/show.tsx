import React from 'react';

import Dialog, { DialogProps } from '@/bases/dialog/dialog';
import renderImptratively from '@/bases/utils/render-imperatively';

export type DialogShowProps = Omit<DialogProps, 'visible'>;

function show(props: DialogShowProps) {
  renderImptratively(<Dialog {...props} />);
}

export default show;
