import { EffectCallback, useRef } from 'react';
import {
  useLoad,
  useUnload,
  useAppActive,
  useAppInactive,
} from 'react-native-lifecycle';

export default (effect: EffectCallback, ms: number) => {
  const i = useRef<any>(null);
  const appActive = useRef<boolean>(true);

  useAppActive(() => {
    appActive.current = true;
  });

  useAppInactive(() => {
    appActive.current = false;
  });

  useLoad(() => {
    i.current = setInterval(() => {
      if (appActive.current) {
        effect();
      }
    }, ms);
  });

  useUnload(() => {
    if (i.current) {
      clearInterval(i.current);
    }
  });
};
