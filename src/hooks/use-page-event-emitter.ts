import { EffectCallback } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLoad, useUnload } from 'react-native-lifecycle';

export default (key: string, effect?: EffectCallback) => {
  const route = useRoute();
  const eventKey = `${route.key}__${key}`;

  useLoad(() => {
    if (typeof effect === 'function') {
      DeviceEventEmitter.addListener(eventKey, effect);
    }
  });

  useUnload(() => {
    if (typeof effect === 'function') {
      DeviceEventEmitter.removeListener(eventKey, effect);
    }
  });

  return () => DeviceEventEmitter.emit(eventKey);
};
