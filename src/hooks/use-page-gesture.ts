import { useRef } from 'react';
import { useLoad, useUnload } from 'react-native-lifecycle';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

export interface PageGestureOptions {
  /**
   * 页面手势返回，是否启用
   */
  enabled?: boolean;
}

export interface PageGestureParams {
  /**
   * 是否启用
   */
  setEnabled: (enabled: boolean) => void;
}

/**
 *  页面手势返回
 * @param {boolean} enabled 是否启用
 * @public
 */
export default ({ enabled }: PageGestureOptions): PageGestureParams => {
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

  useLoad(() => {
    navigation.setOptions({
      gestureEnabled: enabled,
    });
    BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);
  });

  useUnload(() => {
    BackHandler.removeEventListener('hardwareBackPress', onHardwareBackPress);
  });

  return {
    setEnabled,
  };
};
