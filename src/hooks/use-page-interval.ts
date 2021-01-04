import { EffectCallback, useRef } from 'react';
import { useLoad, useUnload } from 'react-native-lifecycle';

export default (effect: EffectCallback, ms: number) => {
  const i = useRef<any>(null);

  useLoad(() => {
    i.current = setInterval(effect, ms);
  });

  useUnload(() => {
    if (i.current) {
      clearInterval(i.current);
    }
  });
};
