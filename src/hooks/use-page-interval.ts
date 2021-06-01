import { EffectCallback, useRef } from 'react';
import { useLoad, useUnload } from 'react-native-lifecycle';

export default (effect: EffectCallback, ms: number) => {
  const i = useRef<number | null>(null);

  useLoad(() => {
    i.current = setInterval(effect, ms);
  });

  useUnload(() => {
    if (i.current) {
      clearInterval(i.current);
    }
  });
};
