import { useState } from 'react';
import { Keyboard, KeyboardEventListener, ScreenRect } from 'react-native';
import { useLoad, useUnload } from 'react-native-lifecycle';

const emptyCoordinates = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
});

const initialValue = {
  start: emptyCoordinates,
  end: emptyCoordinates,
};

export interface KeyboardParams {
  keyboardShown: boolean;
  coordinates: {
    start: ScreenRect;
    end: ScreenRect;
  };
  keyboardHeight: number;
}

export default (): KeyboardParams => {
  const [shown, setShown] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    start: ScreenRect;
    end: ScreenRect;
  }>(initialValue);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const onKeyboardWillShow: KeyboardEventListener = e => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
  };

  const onKeyboardDidShow: KeyboardEventListener = e => {
    setShown(true);
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardWillHide: KeyboardEventListener = e => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
  };

  const onKeyboardDidHide: KeyboardEventListener = e => {
    setShown(false);
    if (e) {
      setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    } else {
      setCoordinates(initialValue);
      setKeyboardHeight(0);
    }
  };

  useLoad(() => {
    Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
  });

  useUnload(() => {
    Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow);
    Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.removeListener('keyboardWillHide', onKeyboardWillHide);
    Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
  });

  return {
    keyboardShown: shown,
    coordinates,
    keyboardHeight,
  };
};
