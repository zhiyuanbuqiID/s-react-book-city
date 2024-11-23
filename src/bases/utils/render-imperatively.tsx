import React from 'react';

import { renderToBody } from '@/bases/utils/render';

export interface ElementProps {
  visible?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
}

const renderImptratively = (element: React.ReactElement<ElementProps>) => {
  const Wraper = () => {
    const [visible, setVisible] = React.useState(false);

    const onClose = () => {
      element.props?.onClose?.();
      setVisible(false);
    };

    const afterClose = () => {
      unmout();
    };

    React.useEffect(() => {
      setVisible(true);
    }, []);

    return React.cloneElement(element, { ...element.props, visible, onClose, afterClose });
  };

  const unmout = renderToBody(<Wraper />);
};

export default renderImptratively;
