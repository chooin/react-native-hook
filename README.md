# React Native Composition

### 如何安装

```sh
yarn add react-native-composition
```

##### 第三方依赖

```sh
yarn add @react-native-lifecycle
yarn add @react-navigation/native # >=5.7.0
```

### 生命周期

##### 全局 Hooks

```js
import { useAppActive, useAppInactive } from 'react-native-lifecycle';

export default function App() {
  // App 从后台变为前台时执行
  useAppActive(() => {});

  // App 从前台变为后台时执行
  useAppInactive(() => {});
}
```

##### 页面 Hooks

```js
import {
  useLoad,
  useShow,
  useHide,
  useUnload,
  useResize,
} from 'react-native-lifecycle';

export default function Page() {
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

##### 第三方依赖

```sh
yarn add react-native-permissions
```

##### APP 权限 Hooks

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
}
```
