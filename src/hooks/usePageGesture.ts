import { useRef } from 'react';
import { useMount, useUnmount } from 'react-native-lifecycle';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

type PageGestureOptions = {
  /**
   * 页面手势返回，是否启用
   */
  enabled?: boolean;
};

type PageGestureResult = {
  /**
   * 是否启用
   */
  setEnabled: (enabled: boolean) => void;
};

/**
 *  页面手势返回
 * @param {boolean} enabled 是否启用
 * @public
 */
export function usePageGesture({
  enabled,
}: PageGestureOptions): PageGestureResult {
  const enabledRef = useRef(enabled);
  const navigation = useNavigation();

  const onHardwareBackPress = () => {
    return !enabledRef.current;
  };

  const setEnabled = (enabled: boolean): void => {
    enabledRef.current = enabled;
    navigation.setOptions({
      gestureEnabled: enabled,
    });
  };

  useMount(() => {
    navigation.setOptions({
      gestureEnabled: enabled,
    });
    BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);
  });

  useUnmount(() => {
    BackHandler.removeEventListener('hardwareBackPress', onHardwareBackPress);
  });

  return {
    setEnabled,
  };
}
