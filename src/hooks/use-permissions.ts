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
  openSettings,
} from 'react-native-permissions';
import { useShow, useHide } from 'react-native-lifecycle';

type Permission = IOSPermission | AndroidPermission | WindowsPermission;
type Permissions = Permission[];
type PermissionsParams = {
  state: boolean | null;
  request: () => Promise<void | { openSettings: Promise<void> }>;
};

export default (
  permissions: Permissions,
  permissionStatus: PermissionStatus = RESULTS.GRANTED,
): PermissionsParams => {
  const [state, setState] = useState<boolean | null>(null);
  if (typeof permissions === 'string') {
    permissions = [permissions];
  }
  permissions = permissions.filter(
    item => item && item.startsWith(Platform.OS),
  ) as Permissions;

  useShow(() => {
    checkMultiple(permissions).then(states => {
      setState(
        permissions.every(
          permission => states[permission] === permissionStatus,
        ),
      );
    });
  });

  useHide(() => {
    setState(null);
  });

  const request = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      requestMultiple(permissions).then(states => {
        if (
          permissions.every(
            permission => states[permission] === permissionStatus,
          )
        ) {
          resolve();
        } else {
          reject({
            openSettings,
          });
        }
      });
    });
  };

  return {
    state,
    request,
  };
};
