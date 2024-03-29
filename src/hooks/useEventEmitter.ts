import { useRef } from 'react';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { useMount, useUnmount } from 'react-native-lifecycle';

type EventEmitterResult = {
  /**
   * 触发订阅事件
   */
  emit: (...params: any[]) => void;
};

/**
 * 事件订阅
 * @param {string} eventType 事件名称
 * @param {function} fn 订阅事件
 * @public
 */
export function useEventEmitter(
  eventType: string,
  fn?: (args: any[]) => void,
): EventEmitterResult {
  const emitterSubscription = useRef<EmitterSubscription | null>(null);

  useMount(() => {
    if (typeof fn === 'function') {
      emitterSubscription.current = DeviceEventEmitter.addListener(
        eventType,
        fn,
      );
    }
  });

  useUnmount(() => {
    if (typeof fn === 'function') {
      emitterSubscription.current?.remove?.();
    }
  });

  return {
    emit: (...params: any[]) => DeviceEventEmitter.emit(eventType, ...params),
  };
}
