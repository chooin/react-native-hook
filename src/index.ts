import { useAppActiveInterval } from './hooks/useAppActiveInterval';
import { useEventEmitter } from './hooks/useEventEmitter';
import { usePermissions } from './hooks/usePermissions';

// Page
import { usePageEventEmitter } from './hooks/usePageEventEmitter';
import { usePageInterval } from './hooks/usePageInterval';
import { usePageGesture } from './hooks/usePageGesture';

import * as permissions from './utils/permissions';

export {
  useAppActiveInterval,
  useEventEmitter,
  usePermissions,
  usePageEventEmitter,
  usePageInterval,
  usePageGesture,
  permissions,
};
