import React from 'react';
import cx from 'classnames';
import { CheckOutline, CloseOutline } from 'antd-mobile-icons';

import SpinnerLoading from '@/bases/spinner-loading';

import './styles/index.scss';

export interface ToastProps {
  /** 提示持续时间 */
  duration?: number;
  /** Toast文本内容 */
  content: React.ReactNode;
  /** Toast关闭后的回调 */
  afterClose?: () => void;
  /** 卸载当前Toast的DOM */
  unmount?: () => void;
  /** Toast图标 */
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode;
}

const classPrefix = 'ygm-toast';

const Toast: React.FC<ToastProps> = (props) => {
  const iconElement = React.useMemo(() => {
    if (props.icon === null || props.icon === undefined) return null;
    switch (props.icon) {
      case 'success':
        return <CheckOutline />;
      case 'fail':
        return <CloseOutline />;
      case 'loading':
        return <SpinnerLoading color="white" />;
      default:
        return props.icon;
    }
  }, [props.icon]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      props.unmount?.();
    }, props.duration);

    return () => clearTimeout(timer);
  }, [props.unmount, props.duration]);

  React.useEffect(() => {
    return () => {
      props.afterClose?.();
    };
  }, [props.afterClose]);

  return (
    <div className={classPrefix}>
      <div className={cx(`${classPrefix}-main`, props.icon ? `${classPrefix}-main-icon` : `${classPrefix}-main-text`)}>
        {iconElement && <div className={`${classPrefix}-icon`}>{iconElement}</div>}
        <div className={`${classPrefix}-text`}>{props.content}</div>
      </div>
    </div>
  );
};

Toast.defaultProps = {
  duration: 2000,
};

Toast.displayName = 'Toast';

export default Toast;
