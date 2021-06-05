# React Native Composition

### 如何安装

```sh
yarn add react-native-composition
```

##### 第三方依赖

```sh
yarn add @react-navigation/native # >= 5.7.0
yarn add react-native-lifecycle # 生命周期
yarn add react-native-permissions # 权限
```

### APP 权限

##### 使用

```js
import { usePermissions } from 'react-native-composition';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function Page() {
  // 权限是否打开
  // 检查 ios 端 PERMISSIONS.IOS.LOCATION_ALWAYS 权限是否打开
  const location = usePermissions([PERMISSIONS.IOS.LOCATION_ALWAYS]);

  // 权限是否不可用
  // ios 端检查 PERMISSIONS.IOS.CAMERA 权限是否不可用
  // android 端检查 PERMISSIONS.ANDROID.CAMERA 权限是否不可用
  const camera = usePermissions(
    [PERMISSIONS.IOS.CAMERA, PERMISSIONS.ANDROID.CAMERA],
    RESULTS.UNAVAILABLE,
  );

  // 权限状态
  console.log(location.state);

  // 请求权限
  const onClick = () => {
    if (location.state === false) {
      location
        .request()
        .then(() => {
          // 所有权限都已打开
        })
        .catch(({ openSettings }) => {
          openSettings();
        });
    }
  };
}
```

```js
import { permissions } from 'react-native-composition';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function Page() {
  permissions
    .request(
      [PERMISSIONS.IOS.CAMERA, PERMISSIONS.ANDROID.CAMERA],
      RESULTS.GRANTED,
    )
    .then(() => {
      // 所有权限都已打开
    })
    .catch(({ openSettings }) => {
      openSettings();
    });
}
```

### usePageEventEmitter

> 页面级事件发射，可以给父子组件发送事件

##### 使用

```js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { usePageEventEmitter } from 'react-native-composition';

// 组件
function Component() {
  // 注册事件
  usePageEventEmitter('Event emitter name', () => {
    console.log('Component');
  });

  return null;
}

// 页面
export default function Page() {
  const refresh = usePageEventEmitter('Event emitter name');

  const onClick = () => {
    refresh.emit(); // 发射事件
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <Component />
    </TouchableOpacity>
  );
}
```

### usePageInterval

> 页面创建时执行，页面销毁时销毁

##### 使用

```js
import { usePageInterval } from 'react-native-composition';

export default function Page() {
  usePageInterval(() => {
    console.log('usePageInterval');
  }, 60 * 1000);
}
```

### useAppActiveInterval

> 页面创建时、App 从后台变为前台时执行，页面销毁时、App 从前台变为后台时销毁

```js
import { useAppActiveInterval } from 'react-native-composition';

export default function Page() {
  useAppActiveInterval(() => {
    console.log('useAppActiveInterval');
  }, 60 * 1000);
}
```

### usePageGestureEnabled

> 是否支持右滑返回到上个页面

##### 使用

```js
import { usePageGestureEnabled } from 'react-native-composition';

export default function Page() {
  const pageGestureEnabled = usePageGestureEnabled(false);

  const onClick = () => {
    pageGestureEnabled.setEnabled(true);
  };
}
```
