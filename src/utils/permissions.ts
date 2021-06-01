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

type Permission = IOSPermission | AndroidPermission | WindowsPermission;
type Permissions = Permission[];
type RequestResponse = Promise<void | { openSettings: Promise<void> }>;

export const request = (
  permissions: Permissions,
  permissionStatus: PermissionStatus = RESULTS.GRANTED,
): RequestResponse => {
  return new Promise((resolve, reject) => {
    permissions.filter((item: string) => item && item.startsWith(Platform.OS));
    checkMultiple(permissions).then(checkMultipleStates => {
      permissions = permissions.filter(
        permission => checkMultipleStates[permission] !== permissionStatus,
      );
      if (permissions.length === 0) {
        resolve();
      } else {
        requestMultiple(permissions).then(requestMultipleStates => {
          permissions = permissions.filter(
            permission =>
              requestMultipleStates[permission] !== permissionStatus,
          );
          if (permissions.length === 0) {
            resolve();
          } else {
            reject({
              openSettings,
            });
          }
        });
      }
    });
  });
};
