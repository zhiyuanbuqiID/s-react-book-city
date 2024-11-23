import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface SpinnerLoadingProps {
  color?: 'default' | 'primary' | 'white';
  size?: number;
  style?: React.CSSProperties;
}

const classPrefix = 'ygm-spinner-loading';

const SpinnerLoading: React.FC<SpinnerLoadingProps> = (props) => {
  return (
    <div
      className={cx(`${classPrefix}`, `${classPrefix}-color-${props.color}`)}
      style={{ ...props.style, width: props.size, height: props.size }}
    />
  );
};

SpinnerLoading.defaultProps = {
  color: 'default',
  size: 32,
};

export default SpinnerLoading;

SpinnerLoading.displayName = 'SpinnerLoading';
