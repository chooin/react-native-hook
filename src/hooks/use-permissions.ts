import {useState} from 'react';
import {Platform} from 'react-native';
import {
  check,
  IOSPermission,
  AndroidPermission,
  RESULTS,
} from 'react-native-permissions';
import {useShow} from 'react-native-lifecycle';

export default (
  permissions:
    | (IOSPermission | AndroidPermission)[]
    | IOSPermission
    | AndroidPermission,
) => {
  const [state, setState] = useState<boolean>(false);

  useShow(() => {
    if (typeof permissions === 'string') {
      permissions = [permissions];
    }
    Promise.all(
      permissions.filter((item) => item.startsWith(Platform.OS)).map(check),
    ).then((res) => {
      setState(res.every((item) => item === RESULTS.GRANTED));
    });
  });

  return state;
};
