import { useRef } from 'react';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { useLoad, useUnload } from 'react-native-lifecycle';

export interface EventEmitterParams {
  /**
   * 触发订阅事件
   */
  emit: (...params: any[]) => void;
}

/**
 * 事件订阅
 * @param {string} eventType 事件名称
 * @param {function} fn 订阅事件
 * @public
 */
export default (eventType: string, fn?: () => void): EventEmitterParams => {
  const emitterSubscription = useRef<EmitterSubscription | null>(null);

  useLoad(() => {
    if (typeof fn === 'function') {
      emitterSubscription.current = DeviceEventEmitter.addListener(
        eventType,
        fn,
      );
    }
  });

  useUnload(() => {
    if (typeof fn === 'function') {
      if (typeof DeviceEventEmitter.removeListener === 'function') {
        DeviceEventEmitter.removeListener(eventType, fn);
      } else {
        emitterSubscription.current?.remove?.();
      }
    }
  });

  return {
    emit: (...params: any[]) => DeviceEventEmitter.emit(eventType, ...params),
  };
};
