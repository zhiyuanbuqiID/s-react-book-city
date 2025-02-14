import React from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { pxToNumber } from '@/bases/ellipsis/utils';
import useResizeObserver from '@/hooks/useResizeObserver';

import './styles/index.scss';

export interface EllipsisProps {
  /** 文本内容 */
  text: string;
  /** 展示几行 */
  rows?: number;
  /** 收起操作元素 */
  collapse?: React.ReactNode;
  /** 展开操作元素 */
  expand?: React.ReactNode;
}

const classPrefix = 'ygm-ellipsis';
const ellipsisTailing = '...';

const Ellipsis: React.FC<EllipsisProps> = (props) => {
  const [exceeded, setExceeded] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [ellipsised, setEllipsised] = React.useState<string>('');

  const containerRef = React.useRef<HTMLDivElement>(null);

  const calcEllipsised = React.useCallback(() => {
    const element = containerRef.current;
    if (!element) return;

    const originStyle = window.getComputedStyle(element);
    const container = document.createElement('div');

    const styleNames: string[] = Array.prototype.slice.apply(originStyle);

    styleNames.forEach((name) => {
      container.style.setProperty(name, originStyle.getPropertyValue(name));
    });

    container.innerText = props.text;

    container.style.height = 'auto';
    container.style.position = 'fixed';
    container.style.visibility = 'hidden';

    document.body.appendChild(container);

    const lineHeight = pxToNumber(originStyle.lineHeight);
    const maxHeight = lineHeight * props.rows!;
    const height = container.getBoundingClientRect().height;

    const check = (left: number, right: number) => {
      let l = left;
      let r = right;
      let text = '';

      while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (l === m) {
          break;
        }

        const tempText = props.text.slice(l, m);
        container.innerText = `${text}${tempText}${ellipsisTailing}${props.expand}`;
        const height = container.getBoundingClientRect().height;
        if (height > maxHeight) {
          r = m;
        } else {
          text += tempText;
          l = m;
        }
      }
      return text;
    };

    if (maxHeight >= height) {
      setExceeded(false);
    } else {
      setExceeded(true);
      const ellipsisedValue = check(0, props.text.length);
      setEllipsised(ellipsisedValue);
    }

    document.body.removeChild(container);
  }, [props.expand, props.rows, props.text]);

  useIsomorphicLayoutEffect(() => {
    calcEllipsised();
  }, [calcEllipsised]);

  useResizeObserver(calcEllipsised, containerRef);

  const renderContent = () => {
    if (!exceeded) {
      return props.text;
    }
    if (expanded) {
      return (
        <>
          {props.text}
          {props.collapse && <a>{props.collapse}</a>}
        </>
      );
    } else {
      return (
        <>
          {ellipsised}
          {ellipsisTailing}
          {props.expand && <a>{props.expand}</a>}
        </>
      );
    }
  };

  const onContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!props.expand && !props.collapse) return;

    if (props.expand && !props.collapse) {
      setExpanded(true);
      return;
    }

    setExpanded(!expanded);
  };

  return (
    <div className={classPrefix} ref={containerRef} onClick={onContent}>
      {renderContent()}
    </div>
  );
};

Ellipsis.defaultProps = {
  text: '',
  rows: 1,
  expand: '',
  collapse: '',
};

Ellipsis.displayName = 'Ellipsis';

export default Ellipsis;
