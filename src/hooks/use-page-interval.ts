import { EffectCallback, useRef } from 'react';
import { useShow, useHide } from 'react-native-lifecycle';

export default (effect: EffectCallback, timeout: number) => {
  const interval = useRef(null);

  useShow(() => {
    interval.current = setInterval(effect, timeout);
  });

  useHide(() => {
    clearInterval(interval.current);
  });
};
