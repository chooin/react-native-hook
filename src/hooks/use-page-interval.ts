import { EffectCallback, useRef } from 'react';
import { useLoad, useUnload } from 'react-native-lifecycle';

export interface PageIntervalOptions {
  /**
   * setInterval 是否激活
   * @default true
   */
  active?: boolean;
}

export interface PageInterval {
  /**
   * 设置 setInterval 是否运行
   * @param active
   */
  setActive: (active: boolean) => void;
}

/**
 * 页面定时器，页面释放时释放
 * @param {function} effect
 * @param {number} ms 毫秒 default RESULTS.GRANTED
 * @param {object} options
 * @param {boolean} options.active 是否激活 default true
 * @public
 */
export default (
  effect: EffectCallback,
  ms: number,
  options: PageIntervalOptions = {},
): PageInterval => {
  const { active = true } = options;
  const i = useRef<number | null>(null);
  const isActive = useRef<boolean>(active);

  useLoad(() => {
    i.current = setInterval(() => {
      if (isActive.current) {
        effect();
      }
    }, ms);
  });

  useUnload(() => {
    if (i.current) {
      clearInterval(i.current);
    }
  });

  const setActive = (active: boolean) => {
    isActive.current = active;
  };

  return {
    setActive,
  };
};
