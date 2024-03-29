import { useRef } from 'react';
import { useMount, useUnmount } from 'react-native-lifecycle';

type PageIntervalOptions = {
  /**
   * setInterval 是否启用
   * @default true
   */
  enabled?: boolean;
};

type PageIntervalResult = {
  /**
   * 设置 setInterval 是否启用
   * @param enabled
   */
  setEnabled: (enabled: boolean) => void;
};

/**
 * 页面定时器，页面释放时释放
 * @param {function} fn
 * @param {number} ms 毫秒 default RESULTS.GRANTED
 * @param {object} options
 * @param {boolean} options.enabled 是否启用 default true
 * @public
 */
export function usePageInterval(
  fn: () => void,
  ms: number,
  options: PageIntervalOptions = {},
): PageIntervalResult {
  const { enabled = true } = options;
  const timer = useRef<NodeJS.Timer>();
  const isEnabled = useRef<boolean>(enabled);

  useMount(() => {
    timer.current = setInterval(() => {
      if (isEnabled.current) {
        fn();
      }
    }, ms);
  });

  useUnmount(() => {
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
