import { EffectCallback } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLoad, useUnload } from 'react-native-lifecycle';

export interface PageEventEmitterParams {
  /**
   * 订阅事件
   */
  emit: () => void;
}

/**
 * 页面级事件订阅
 * @param {string} key 事件名称
 * @param {function} effect 订阅事件
 * @public
 */
export default (
  key: string,
  effect?: EffectCallback,
): PageEventEmitterParams => {
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

  return {
    emit: () => DeviceEventEmitter.emit(eventKey),
  };
};
