import { useLoad, useUnload } from 'react-native-lifecycle';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

export default (enabled: boolean) => {
  const navigation = useNavigation();

  const _hardwareBackPress = () => {
    if (enabled) {
      return false;
    } else {
      return true;
    }
  };

  useLoad(() => {
    navigation.setOptions({
      gestureEnabled: enabled,
    });
    BackHandler.addEventListener('hardwareBackPress', _hardwareBackPress);
  });

  useUnload(() => {
    BackHandler.removeEventListener('hardwareBackPress', _hardwareBackPress);
  });
};
