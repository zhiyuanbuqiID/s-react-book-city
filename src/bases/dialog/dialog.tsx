import React from 'react';

import { useSpring, animated } from '@react-spring/web';

import Mask, { MaskProps } from '@/bases/mask';
import DialogActionButton, { Action } from '@/bases/dialog/dialog-action-button';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import './styles/index.scss';

export interface DialogProps {
  /** 对话框标题 */
  title?: React.ReactNode;
  /** 对话框内容 */
  content?: React.ReactNode;
  /** 显示隐藏 */
  visible?: boolean;
  actions?: Action[];
  maskStyle?: MaskProps['style'];
  /** 点击action后是否关闭 */
  closeOnAction?: boolean;
  /** Dialog关闭时的回调 */
  onClose?: () => void;
  /** 显示后回调 */
  afterShow?: () => void;
  /** 关闭后回调 */
  afterClose?: () => void;
  /** 点击action后回调 */
  onAction?: (action: Action, index: number) => void | Promise<void>;
}

const classPrefix = 'ygm-dialog';

const Dialog: React.FC<DialogProps> = (props) => {
  const [active, setActive] = React.useState<boolean>(props.visible!);

  const style = useSpring({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 2.2,
      tension: 200,
      friction: 25,
      clamp: true,
    },
    onRest: () => {
      if (props.visible) {
        props.afterShow?.();
      } else {
        props.afterClose?.();
      }
    },
  });

  const renderTitle = () => {
    if (props.title) {
      return <div className={`${classPrefix}-header`}>{props.title}</div>;
    }
    return null;
  };

  const renderContent = () => {
    if (props.content) {
      return (
        <div className={`${classPrefix}-content`}>
          <div>{props.content}</div>
        </div>
      );
    }
    return null;
  };

  const renderFooter = () => {
    return (
      <div className={`${classPrefix}-footer`}>
        {props.actions!.map((action, index) => (
          <DialogActionButton
            key={action.key}
            action={action}
            onAction={async () => {
              await Promise.all([action.onClick?.(), props.onAction?.(action, index)]);
              if (props.closeOnAction) {
                props.onClose?.();
              }
            }}
          />
        ))}
      </div>
    );
  };

  useIsomorphicLayoutEffect(() => {
    if (props.visible) {
      setActive(true);
    }
  }, [props.visible]);

  return (
    <div className={classPrefix} style={{ display: active ? undefined : 'none' }}>
      <Mask visible={props.visible!} style={props.maskStyle} onMaskClick={props.onClose} />
      <div className={`${classPrefix}-wrap`}>
        <animated.div style={style}>
          <div className={`${classPrefix}-body`}>
            {renderTitle()}
            {renderContent()}
            {renderFooter()}
          </div>
        </animated.div>
      </div>
    </div>
  );
};

Dialog.defaultProps = {
  visible: false,
  actions: [] as Action[],
};

Dialog.displayName = 'Dialog';

export default Dialog;
