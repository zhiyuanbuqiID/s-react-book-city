import React from 'react';

import SwiperItem from '@/bases/swiper/swiper-item';
import SwiperPageIndicator from '@/bases/swiper/swiper-page-indicator';

import { modulus } from '@/bases/swiper/utils';

import './styles/swiper.scss';

export interface SwiperProps {
  /** 是否循环播放 */
  loop?: boolean;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 轮播间隔时间 */
  autoPlayInterval?: number;
  /** 默认显示第几张 */
  defaultIndex?: number;
  showIndicator?: boolean;
  indicatorClassName?: string;
  children: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties & Partial<Record<'--height' | '--width' | '--border-radius' | '--track-padding', string>>;
}

const classPrefix = 'ygm-swiper';

const Swiper: React.FC<SwiperProps> = (props) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(props.defaultIndex || 0);
  const [dragging, setDragging] = React.useState<boolean>(false);

  const startRef = React.useRef<number>(0);
  const slideRatioRef = React.useRef<number>(0);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const autoPlaying = React.useRef<boolean>(false);
  const intervalRef = React.useRef<number>(0);

  const { validChildren, count } = React.useMemo(() => {
    let count = 0;
    const validChildren = React.Children.map(props.children, (child) => {
      // 验证对象是否是一个React元素
      if (!React.isValidElement(child)) return null;
      // 验证是否是一个SwiperItem类型
      if (child.type !== SwiperItem) {
        console.warn('Swiper children must be Swiper.Item components');
      }

      count++;
      return child;
    });

    return { validChildren, count };
  }, [props.children]);

  const getFinalPosition = (index: number) => {
    let finalPosition = -currentIndex * 100 + index * 100;

    if (!props.loop) return finalPosition;

    const totalWidth = count * 100;
    // 无限轮播，当前图的前后平均分配轮播图数量
    const flagWidth = totalWidth / 2;
    // 1 2 3 4 ===》3 4 1 2
    // 4===> 300 , flagWidth = 200
    // (300 + 200) % 400 = 100 100 - flagWidth ===> -100
    finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;

    return finalPosition;
  };

  const getTransition = (position: number) => {
    if (dragging) {
      return '';
    } else if (autoPlaying.current) {
      if (position === -100 || position === 0) {
        return 'transform 0.3s ease-out';
      } else {
        return '';
      }
    } else if (position < -100) {
      return '';
    }
    return 'transform 0.3s ease-out';
  };

  const renderSwiperItem = () => {
    return (
      <div className={`${classPrefix}-track-inner`}>
        {React.Children.map(validChildren, (child, index) => {
          const position = getFinalPosition(index);

          return (
            <div
              className={`${classPrefix}-slide`}
              style={{
                left: `-${index * 100}%`,
                transform: `translate3d(${position}%,0,0)`,
                transition: getTransition(position),
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  };

  const getSlideRatio = (diff: number) => {
    const element = trackRef.current;
    if (!element) return 0;

    return diff / element.offsetWidth;
  };

  const boundIndex = React.useCallback(
    (currentIndex: number) => {
      let min = 0;
      let max = count - 1;
      let ret = currentIndex;
      ret = Math.max(currentIndex, min);
      ret = Math.min(ret, max);
      return ret;
    },
    [count]
  );

  const swipeTo = React.useCallback(
    (index: number) => {
      const targetIndex = props.loop ? modulus(index, count) : boundIndex(index);
      setCurrentIndex(targetIndex);
    },
    [boundIndex, count, props.loop]
  );

  const swipeNext = React.useCallback(() => {
    swipeTo(currentIndex + 1);
  }, [swipeTo, currentIndex]);

  const onTouchEnd = () => {
    const index = Math.round(slideRatioRef.current);
    slideRatioRef.current = 0;

    const position = currentIndex + index;

    swipeTo(position);
    setDragging(false);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };

  const onTouchMove = (e: TouchEvent) => {
    const currentX = e.changedTouches[0].clientX;
    const diff = startRef.current - currentX;
    slideRatioRef.current = getSlideRatio(diff);
    let position = currentIndex + slideRatioRef.current;

    if (!props.loop) {
      position = boundIndex(position);
    }

    setCurrentIndex(position);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startRef.current = e.changedTouches[0].clientX;

    setDragging(true);
    clearInterval(intervalRef.current);
    autoPlaying.current = false;

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  React.useEffect(() => {
    if (!props.autoplay || dragging) return;

    intervalRef.current = window.setInterval(() => {
      autoPlaying.current = true;
      swipeNext();
    }, props.autoPlayInterval);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [dragging, props.autoPlayInterval, props.autoplay, swipeNext]);

  if (count === 0 || !validChildren) {
    console.warn('Swiper at least one child element is required');
    return null;
  }

  return (
    <div className={classPrefix} style={props.style}>
      <div className={`${classPrefix}-track`} onTouchStart={onTouchStart} ref={trackRef}>
        {renderSwiperItem()}
      </div>
      {props.showIndicator && (
        <div className={`${classPrefix}-indicator`}>
          <SwiperPageIndicator
            total={count}
            current={slideRatioRef.current > 0 ? Math.floor(currentIndex) : Math.ceil(currentIndex)}
            indicatorClassName={props.indicatorClassName}
          />
        </div>
      )}
    </div>
  );
};

export default Swiper;

Swiper.defaultProps = {
  autoplay: false,
  defaultIndex: 0,
  showIndicator: true,
  loop: false,
  autoPlayInterval: 3000,
};

Swiper.displayName = 'Swiper';
