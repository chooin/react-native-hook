import { EffectCallback, useRef } from 'react';
import {
  useLoad,
  useUnload,
  useAppActive,
  useAppInactive,
} from 'react-native-lifecycle';

export interface AppActiveIntervalOptions {
  /**
   * setInterval 是否运行
   *
   * @default true
   */
  active?: boolean;
}

export interface AppActiveInterval {
  /**
   * 设置 setInterval 是否运行
   * @param active
   */
  setActive: (active: boolean) => void;
}

export default (
  effect: EffectCallback,
  ms: number,
  options: AppActiveIntervalOptions = {},
): AppActiveInterval => {
  const { active = true } = options;
  const i = useRef<number | null>(null);
  const appActive = useRef<boolean>(true);
  const isActive = useRef<boolean>(active);

  useAppActive(() => {
    appActive.current = true;
  });

  useAppInactive(() => {
    appActive.current = false;
  });

  useLoad(() => {
    i.current = setInterval(() => {
      if (appActive.current && isActive.current) {
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
