import { useRef } from 'react';
import { useLoad, useUnload } from 'react-native-lifecycle';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

export default (enabled: boolean) => {
  const enabledRef = useRef(enabled);
  const navigation = useNavigation();

  const _onHardwareBackPress = () => {
    if (enabledRef.current) {
      return false;
    } else {
      return true;
    }
  };

  const setEnabled = (enabled: boolean) => {
    enabledRef.current = enabled;
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
