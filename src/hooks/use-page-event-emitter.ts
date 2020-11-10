import { EffectCallback } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLoad, useUnload } from 'react-native-lifecycle';

export default (effect?: EffectCallback) => {
  const route = useRoute();

  useLoad(() => {
    if (effect) {
      DeviceEventEmitter.addListener(route.key, effect);
    }
  });

  useUnload(() => {
    if (effect) {
      DeviceEventEmitter.removeListener(route.key, effect);
    }
  });

  return () => DeviceEventEmitter.emit(route.key);
};
