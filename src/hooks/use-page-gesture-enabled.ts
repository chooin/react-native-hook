import { useRef } from 'react';
import { useLoad, useUnload } from 'react-native-lifecycle';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

type PageGestureEnabledParams = {
  /**
   * 是否激活
   */
  setEnabled: (enabled: boolean) => void;
};

/**
 *  页面手势返回
 * @param {boolean} enabled 是否激活
 * @public
 */
export default (enabled: boolean): PageGestureEnabledParams => {
  const enabledRef = useRef(enabled);
  const navigation = useNavigation();

  const _onHardwareBackPress = () => {
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
    BackHandler.addEventListener('hardwareBackPress', _onHardwareBackPress);
  });

  useUnload(() => {
    BackHandler.removeEventListener('hardwareBackPress', _onHardwareBackPress);
  });

  return {
    setEnabled,
  };
};
