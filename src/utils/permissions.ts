import { Platform } from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  Permission,
  PermissionStatus,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

type PermissionsRequest = Promise<void | { openSettings: Promise<void> }>;
/**
 * @param permissions
 * @param permissionStatus
 */
const request = (
  permissions: Permission[],
  permissionStatus: PermissionStatus = RESULTS.GRANTED,
): PermissionsRequest => {
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

export default {
  request,
};
