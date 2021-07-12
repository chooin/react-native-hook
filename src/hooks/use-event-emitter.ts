import { EffectCallback } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useLoad, useUnload } from 'react-native-lifecycle';

export interface EventEmitterParams {
  /**
   * 订阅事件
   */
  emit: () => void;
}

/**
 * 事件订阅
 * @param {string} eventType 事件名称
 * @param {function} effect 订阅事件
 * @public
 */
export default (
  eventType: string,
  effect?: EffectCallback,
): EventEmitterParams => {
  useLoad(() => {
    if (typeof effect === 'function') {
      DeviceEventEmitter.addListener(eventType, effect);
    }
  });

  useUnload(() => {
    if (typeof effect === 'function') {
      DeviceEventEmitter.removeListener(eventType, effect);
    }
  });

  return {
    emit: () => DeviceEventEmitter.emit(eventType),
  };
};
