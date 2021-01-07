# React Native Composition

### 如何安装

```sh
yarn add react-native-composition
```

##### 第三方依赖

```sh
yarn add react-native-lifecycle # 生命周期依赖
yarn add @react-navigation/native # 生命周期依赖 >=5.7.0
yarn add react-native-permissions # 权限
```

### 生命周期

##### 使用

```js
import {
  useAppActive,
  useAppInactive,
  useLoad,
  useShow,
  useHide,
  useUnload,
  useResize,
} from 'react-native-lifecycle';

export default function Page() {
  // App 从后台变为前台时执行
  useAppActive(() => {});

  // App 从前台变为后台时执行
  useAppInactive(() => {});

  // 页面创建时执行
  useLoad(() => {});

  // 页面出现在前台时执行
  useShow(() => {});

  // 页面从前台变为后台时执行
  useHide(() => {});

  // 页面销毁时执行
  useUnload(() => {});

  // 页面尺寸变化时执行
  useResize(() => {});
}
```

### APP 权限

##### 使用

```js
import { usePermissions } from 'react-native-composition';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function Page() {
  // 权限是否打开
  // 检查 ios 端 PERMISSIONS.IOS.LOCATION_ALWAYS 权限是否打开
  const location = usePermissions(PERMISSIONS.IOS.LOCATION_ALWAYS);

  // 权限是否不可用
  // ios 端检查 PERMISSIONS.IOS.CAMERA 权限是否不可用
  // android 端检查 PERMISSIONS.ANDROID.CAMERA 权限是否不可用
  const camera = usePermissions(
    [PERMISSIONS.IOS.CAMERA, PERMISSIONS.ANDROID.CAMERA],
    RESULTS.UNAVAILABLE,
  );

  // 输出权限状态
  console.log(location.state);

  // 请求权限
  if (location.state === false) {
    location
      .request()
      .then(() => {
        // 成功
      })
      .catch(({ openSettings }) => {
        openSettings();
      });
  }
}
```

### usePageEventEmitter 页面级事件发射

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

  const _onPress = () => {
    refresh.emit(); // 发射事件
  };

  return (
    <TouchableOpacity onPress={_onPress}>
      <Component />
    </TouchableOpacity>
  );
}
```

### usePageInterval 页面级 Interval

##### 使用

```js
import { usePageInterval } from 'react-native-composition';

export default function Page() {
  usePageInterval(() => {
    console.log('usePageInterval');
  }, 60 * 1000);
}
```

### useKeyboard

##### 使用

```js
import { useKeyboard } from 'react-native-composition';

export default function Page() {
  const keyboard = useKeyboard();
  // {
  //   "coordinates": {
  //     "end": {
  //       "height": 336,
  //       "screenX": 0,
  //       "screenY": 812,
  //       "width": 375
  //     },
  //     "start": {
  //       "height": 336,
  //       "screenX": 0,
  //       "screenY": 476,
  //       "width": 375
  //     }
  //   },
  //   "keyboardHeight": 336,
  //   "keyboardShown": false
  // }
}
```

### usePageGestureEnabled

##### 使用

```js
import { usePageGestureEnabled } from 'react-native-composition';

export default function Page() {
  usePageGestureEnabled(false);
}
```
