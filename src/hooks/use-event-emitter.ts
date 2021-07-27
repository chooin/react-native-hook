import { EffectCallback, useRef } from 'react';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { useLoad, useUnload } from 'react-native-lifecycle';

export interface EventEmitterParams {
  /**
   * 订阅事件
   */
  emit: (...params: any[]) => void;
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
  const emitterSubscription = useRef<EmitterSubscription | null>(null);

  useLoad(() => {
    if (typeof effect === 'function') {
      emitterSubscription.current = DeviceEventEmitter.addListener(
        eventType,
        effect,
      );
    }
  });

  useUnload(() => {
    if (typeof effect === 'function') {
      if (typeof DeviceEventEmitter.removeListener === 'function') {
        DeviceEventEmitter.removeListener(eventType, effect);
      } else {
        emitterSubscription.current?.remove?.();
      }
    }
  });

  return {
    emit: (...params: any[]) => DeviceEventEmitter.emit(eventType, ...params),
  };
};
