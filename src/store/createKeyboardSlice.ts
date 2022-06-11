import { GetState, SetState } from 'zustand';

export interface KeyboardSlice {
  isKeyUpActive: boolean;
  isKeyDownActive: boolean;
  isKeyLeftActive: boolean;
  isKeyRightActive: boolean;
  isKeyPauseActive: boolean;
  isKeySoundActive: boolean;
  isKeyResetActive: boolean;
  isKeyDropActive: boolean;
  isKeyHoldActive: boolean;
  setKey: SetState<KeyboardSlice>;
}

export function createKeyboardSlice(
  set: SetState<KeyboardSlice>,
  _get: GetState<KeyboardSlice>,
): KeyboardSlice {
  return {
    isKeyUpActive: false,
    isKeyDownActive: false,
    isKeyLeftActive: false,
    isKeyRightActive: false,
    isKeyPauseActive: false,
    isKeySoundActive: false,
    isKeyResetActive: false,
    isKeyDropActive: false,
    isKeyHoldActive: false,
    setKey: set,
  };
}
