import React from 'react';
import cx from 'classnames';

import Thumb from '@/bases/slider/thumb';

import { getValueByScope } from '@/bases/utils/utils';

import './styles/slider.scss';

export interface SliderRef {
  setValue: (value: number) => void;
}

export interface SliderProps {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 滑块当前值 */
  value?: number;
  /** 步距 */
  step?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 拖拽滑块时回调 */
  onChange?: (value: number) => void;
  /** 滑动后或点击滑块后取值，类似touchEnd */
  onChangeAfter?: (value: number) => void;
  /** 自定义style样式变量 */
  style?: React.CSSProperties &
    Partial<Record<'--slider-bar-fill-color' | '--slider-background-color' | '--slider-bar-height', string>>;
}

const classPrefix = 'ygm-slider';

const Slider = React.forwardRef<SliderRef, SliderProps>((props, ref) => {
  const [sliderValue, setSliderValue] = React.useState<number>(getValueByScope(props.value!, props.min!, props.max!));

  const trackRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    setValue: (val: number) => {
      setSliderValue(getValueByScope(val, props.min!, props.max!));
    },
  }));

  const scope = props.max! - props.min!;
  const fillSize = `${((sliderValue - props.min!) * 100) / scope}%`;

  const getValueByPosition = (position: number) => {
    const newPosition = getValueByScope(position, props.min!, props.max!);
    const value = Math.round(newPosition / props.step!) * props.step!;

    return value;
  };

  const onDrag = (position: number) => {
    const targetValue = getValueByPosition(position);
    setSliderValue(targetValue);
    props.onChange?.(targetValue);
  };

  const onEnd = (position: number) => {
    const targetValue = getValueByPosition(position);
    props.onChangeAfter?.(targetValue);
  };

  const onTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const track = trackRef.current;
    if (props.disabled || !track) return;

    const rect = track.getBoundingClientRect();

    const sliderWidth = rect.width;
    const sliderOffsetLeft = rect.left;
    const delta = e.clientX - sliderOffsetLeft;

    const position = (delta / sliderWidth) * scope + props.min!;

    const targetValue = getValueByPosition(position);
    setSliderValue(targetValue);
    props.onChangeAfter?.(targetValue);
  };

  return (
    <div
      className={cx(classPrefix, { [`${classPrefix}-disabled`]: props.disabled })}
      style={props.style}
      ref={trackRef}
      onClick={onTrack}
    >
      <div className={`${classPrefix}-fill`} style={{ width: fillSize }} />
      <Thumb
        value={sliderValue}
        min={props.min!}
        max={props.max!}
        disabled={props.disabled!}
        trackRef={trackRef}
        onDrag={onDrag}
        onChangeAfter={onEnd}
      />
    </div>
  );
});

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  value: 0,
};

Slider.displayName = 'Slider';

export default Slider;
