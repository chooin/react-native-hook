import { Platform } from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  Permission,
  PermissionStatus,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export type PermissionsRequestResult = Promise<void | {
  openSettings: Promise<void>;
}>;

/**
 * 权限
 * @param {Permission[]} permissions 权限列表
 * @param {RESULTS} permissionStatus default RESULTS.GRANTED
 * @public
 */
function request(
  permissions: Permission[],
  permissionStatus: PermissionStatus = RESULTS.GRANTED,
): PermissionsRequestResult {
  return new Promise((resolve, reject) => {
    permissions.filter((item: string) => item?.startsWith(Platform.OS));
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
}

export default {
  request,
};
