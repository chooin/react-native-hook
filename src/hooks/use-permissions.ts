import { useState } from 'react';
import { Platform } from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  IOSPermission,
  AndroidPermission,
  WindowsPermission,
  PermissionStatus,
  RESULTS,
} from 'react-native-permissions';
import { useShow, useHide } from 'react-native-lifecycle';

type Permissions =
  | (IOSPermission | AndroidPermission | WindowsPermission)[]
  | IOSPermission
  | AndroidPermission
  | WindowsPermission;

type PermissionsResult = {
  state: boolean | null;
  request: () => Promise<unknown>;
};

export default (
  permissions: Permissions,
  permissionStatus: PermissionStatus = RESULTS.GRANTED,
): PermissionsResult => {
  const [state, setState] = useState<boolean | null>(null);
  if (typeof permissions === 'string') {
    permissions = [permissions];
  }
  permissions = permissions.filter(
    (item: string) => item && item.startsWith(Platform.OS),
  );

  useShow(() => {
    checkMultiple(permissions as []).then(states => {
      setState(
        (permissions as []).every(
          permission => states[permission] === permissionStatus,
        ),
      );
    });
  });

  useHide(() => {
    setState(null);
  });

  const request = () => {
    return new Promise((resolve, reject) => {
      requestMultiple(permissions as []).then(states => {
        if (
          (permissions as []).every(
            permission => states[permission] === permissionStatus,
          )
        ) {
          resolve(true);
        } else {
          reject();
        }
      });
    });
  };

  return {
    state,
    request,
  };
};
