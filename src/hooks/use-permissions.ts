import { useState } from 'react';
import { Platform } from 'react-native';
import {
  check,
  IOSPermission,
  AndroidPermission,
  PermissionStatus,
  RESULTS,
} from 'react-native-permissions';
import { useShow, useHide } from 'react-native-lifecycle';

type Permissions =
  | (IOSPermission | AndroidPermission)[]
  | IOSPermission
  | AndroidPermission;

export default (
  permissions: Permissions,
  permissionStatus: PermissionStatus = RESULTS.GRANTED,
): boolean | null => {
  const [state, setState] = useState<boolean | null>(null);

  useShow(() => {
    if (typeof permissions === 'string') {
      permissions = [permissions];
    }
    Promise.all(
      permissions.filter(item => item.startsWith(Platform.OS)).map(check),
    ).then(res => {
      setState(res.every(item => item === permissionStatus));
    });
  });

  useHide(() => {
    setState(null);
  });

  return state;
};
