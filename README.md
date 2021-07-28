# React Native Hook

[![Latest Version on NPM](https://img.shields.io/npm/v/react-native-hook.svg?style=flat-square)](https://npmjs.com/package/react-native-hook)
[![npm](https://img.shields.io/npm/dt/react-native-hook.svg?style=flat-square)](https://www.npmjs.com/package/react-native-hook)

### 如何安装

```sh
yarn add react-native-hook
```

##### 第三方依赖

```sh
yarn add @react-navigation/native # >= 5.7.0
yarn add react-native-lifecycle # 生命周期
yarn add react-native-permissions # 权限
```

### API

- [usePermissions](https://github.com/Chooin/react-native-hook#usepermissions)
- [useEventEmitter](https://github.com/Chooin/react-native-hook#useeventemitter)
- [usePageEventEmitter](https://github.com/Chooin/react-native-hook#usepageeventemitter)
- [usePageInterval](https://github.com/Chooin/react-native-hook#usepageinterval)
- [useAppActiveInterval](https://github.com/Chooin/react-native-hook#useappactiveinterval)
- [usePageGestureEnabled](https://github.com/Chooin/react-native-hook#usepagegestureenabled)

### usePermissions

> 检查 App 权限是否开启，未开启则可以向系统申请开启

##### 使用

```js
import { usePermissions } from 'react-native-hook';
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

> 直接向系统申请未开启的权限

##### 使用

```js
import { permissions } from 'react-native-hook';
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

### useEventEmitter

> 事件触发与事件监听器功能（页面创建时创建，页面销毁时销毁）

##### 使用

```js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useEventEmitter } from 'react-native-hook';

// 组件
function Component() {
  // 注册事件
  useEventEmitter('Event emitter name', params => {
    console.log('Hello', params);
    // Hello World
  });

  return null;
}

// 页面
export default function App() {
  const refresh = useEventEmitter('Event emitter name');

  const onClick = () => {
    refresh.emit('World'); // 发射事件
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <Component />
    </TouchableOpacity>
  );
}
```

### usePageEventEmitter

> 事件触发与事件监听器功能（页面级事件，仅当前页面有效，页面创建时创建，页面销毁时销毁）

##### 使用

```js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { usePageEventEmitter } from 'react-native-hook';

// 组件
function Component() {
  // 注册事件
  usePageEventEmitter('Event emitter name', params => {
    console.log('Hello', params);
    // Hello World
  });

  return null;
}

// 页面
export default function Page() {
  const refresh = usePageEventEmitter('Event emitter name');

  const onClick = () => {
    refresh.emit('World'); // 发射事件
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <Component />
    </TouchableOpacity>
  );
}
```

### usePageInterval

> 定时器（页面级事件，页面创建时创建，页面销毁时销毁）

##### 使用

```js
import { usePageInterval } from 'react-native-hook';

export default function Page() {
  const pageInterval = usePageInterval(() => {
    console.log('usePageInterval');
  }, 60 * 1000);

  const onClick = () => {
    pageInterval.setEnabled(false);
  };
}
```

### useAppActiveInterval

> 定时器（App 级事件，App 活跃时执行）

##### 使用

```js
import { useAppActiveInterval } from 'react-native-hook';

export default function App() {
  const appActiveInterval = useAppActiveInterval(() => {
    console.log('useAppActiveInterval');
  }, 60 * 1000);

  const onClick = () => {
    appActiveInterval.setEnabled(false);
  };
}
```

### usePageGestureEnabled

> 设置当前页面是否支持右滑返回（页面级事件，页面创建时创建，页面销毁时销毁）

##### 使用

```js
import { usePageGestureEnabled } from 'react-native-hook';

export default function Page() {
  const pageGestureEnabled = usePageGestureEnabled(false);

  const onClick = () => {
    pageGestureEnabled.setEnabled(true);
  };
}
```
