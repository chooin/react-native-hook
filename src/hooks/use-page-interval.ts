import { EffectCallback, useRef } from 'react';
import { useLoad, useUnload } from 'react-native-lifecycle';

export interface PageIntervalOptions {
  /**
   * setInterval 是否运行
   *
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
