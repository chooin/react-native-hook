import { useState } from 'react';
import { Platform } from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  Permission,
  PermissionStatus,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import { useShow, useHide } from 'react-native-lifecycle';

type RequestResponse = Promise<void | { openSettings: Promise<void> }>;
type State = boolean | null;
type PermissionsParams = {
  state: State;
  request: () => RequestResponse;
};

export default (
  permissions: Permission[],
  permissionStatus: PermissionStatus = RESULTS.GRANTED,
): PermissionsParams => {
  const [state, setState] = useState<State>(null);
  permissions = permissions.filter(
    item => item && item.startsWith(Platform.OS),
  );

  useShow(() => {
    checkMultiple(permissions).then(statuses => {
      setState(
        permissions.every(
          permission => statuses[permission] === permissionStatus,
        ),
      );
    });
  });

  useHide(() => {
    setState(null);
  });

  const request = (): RequestResponse => {
    return new Promise((resolve, reject) => {
      requestMultiple(permissions).then(statuses => {
        if (
          permissions.every(
            permission => statuses[permission] === RESULTS.GRANTED,
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
