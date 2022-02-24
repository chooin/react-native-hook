import { useRef } from 'react';
import {
  useLoad,
  useUnload,
  useAppActive,
  useAppInactive,
} from 'react-native-lifecycle';

type AppActiveIntervalOptions = {
  /**
   * setInterval 是否启用
   * @default true
   */
  enabled?: boolean;
};

type AppActiveIntervalResult = {
  /**
   * 设置 setInterval 是否启用
   * @param {boolean} enabled
   */
  setEnabled: (enabled: boolean) => void;
};

/**
 * App 定时器，App 活跃时激活，App 后台运行时停止
 * @param {function} fn 事件
 * @param {number} ms 毫秒
 * @param {object} options
 * @param {boolean} options.enabled 是否启用 default true
 * @public
 */
export function useAppActiveInterval(
  fn: () => void,
  ms: number,
  options: AppActiveIntervalOptions = {},
): AppActiveIntervalResult {
  const { enabled = true } = options;
  const timer = useRef<number>();
  const appActive = useRef<boolean>(true);
  const isEnabled = useRef<boolean>(enabled);

  useAppActive(() => {
    appActive.current = true;
  });

  useAppInactive(() => {
    appActive.current = false;
  });

  useLoad(() => {
    timer.current = setInterval(() => {
      if (appActive.current && isEnabled.current) {
        fn();
      }
    }, ms);
  });

  useUnload(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  });

  const setEnabled = (enabled: boolean) => {
    isEnabled.current = enabled;
  };

  return {
    setEnabled,
  };
}
