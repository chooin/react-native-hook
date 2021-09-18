import { useRef } from 'react';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLoad, useUnload } from 'react-native-lifecycle';

export interface PageEventEmitterParams {
  /**
   * 触发订阅事件
   */
  emit: (...params: any[]) => void;
}

/**
 * 页面级事件订阅
 * @param {string} eventType 事件名称
 * @param {function} fn 订阅事件
 * @public
 */
export default (
  eventType: string,
  fn?: (args: any[]) => void,
): PageEventEmitterParams => {
  const route = useRoute();
  const emitterSubscription = useRef<EmitterSubscription | null>(null);
  eventType = `${route.key}__${eventType}`;

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
      emitterSubscription.current?.remove?.();
    }
  });

  return {
    emit: (...params: any[]) => DeviceEventEmitter.emit(eventType, ...params),
  };
};
