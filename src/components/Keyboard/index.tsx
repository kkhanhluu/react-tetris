import { Button } from 'components/Keyboard/Button';
import { FunctionComponent, useRef } from 'react';
import {
  keyDownEventHandler,
  keyUpEventHandler,
} from 'services/keyboardService';
import { useStore } from 'store';
import { KeyboardContainer } from './style';

type KeyboardKey =
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Space'
  | 'r'
  | 's'
  | 'p';

export const Keyboard: FunctionComponent = () => {
  const store = useStore();
  const touchEvent = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
    r: false,
    p: false,
    s: false,
  });

  function mouseDownHandler(keyboard: KeyboardKey) {
    const key = keyboard === 'Space' ? ' ' : keyboard;
    if (touchEvent.current[keyboard]) {
      return;
    }
    keyDownEventHandler(key, store);
    touchEvent.current[keyboard] = true;
  }

  function mouseUpHandler(keyboard: KeyboardKey) {
    const key = keyboard === 'Space' ? ' ' : keyboard;
    if (touchEvent.current[keyboard]) {
      touchEvent.current[keyboard] = false;
      return;
    }
    keyUpEventHandler(key, store);
    touchEvent.current[keyboard] = false;
  }

  function touchStartHandler(keyboard: KeyboardKey) {
    const key = keyboard === 'Space' ? ' ' : keyboard;

    touchEvent.current[keyboard] = true;
    keyDownEventHandler(key, store);
  }

  return (
    <KeyboardContainer>
      <Button
        color="blue"
        size="btn-md"
        top={0}
        left={374}
        label="Rotate"
        arrow="translate(0, 63px)"
        isPositionAbsolute
        onMouseDown={() => mouseDownHandler('ArrowUp')}
        onMouseUp={() => mouseUpHandler('ArrowUp')}
        onTouchStart={() => touchStartHandler('ArrowUp')}
        onTouchEnd={() => keyUpEventHandler('ArrowUp', store)}
        active={store.isKeyUpActive}
      />
      <Button
        color="blue"
        size="btn-md"
        top={180}
        left={374}
        label="Down"
        onMouseDown={() => mouseDownHandler('ArrowDown')}
        onMouseUp={() => mouseUpHandler('ArrowDown')}
        onTouchStart={() => touchStartHandler('ArrowDown')}
        onTouchEnd={() => keyUpEventHandler('ArrowDown', store)}
        arrow="translate(0,-71px) rotate(180deg)"
        active={store.isKeyDownActive}
      />
      <Button
        color="blue"
        size="btn-md"
        top={90}
        left={284}
        label="Left"
        arrow="translate(60px, -12px) rotate(270deg)"
        active={store.isKeyLeftActive}
        onMouseDown={() => mouseDownHandler('ArrowLeft')}
        onMouseUp={() => mouseUpHandler('ArrowLeft')}
        onTouchStart={() => touchStartHandler('ArrowLeft')}
        onTouchEnd={() => keyUpEventHandler('ArrowLeft', store)}
      />
      <Button
        color="blue"
        size="btn-md"
        top={90}
        left={464}
        label="Right"
        arrow="translate(-60px, -12px) rotate(90deg)"
        active={store.isKeyRightActive}
        onMouseDown={() => mouseDownHandler('ArrowRight')}
        onMouseUp={() => mouseUpHandler('ArrowRight')}
        onTouchStart={() => touchStartHandler('ArrowRight')}
        onTouchEnd={() => keyUpEventHandler('ArrowRight', store)}
      />
      <Button
        color="blue"
        size="btn-lg"
        top={100}
        left={52}
        label="Drop (SPACE)"
        active={store.isKeyDropActive}
        onMouseDown={() => mouseDownHandler('Space')}
        onMouseUp={() => mouseUpHandler('Space')}
        onTouchStart={() => touchStartHandler('Space')}
        onTouchEnd={() => keyUpEventHandler(' ', store)}
      />
      <Button
        color="red"
        size="btn-sm"
        top={0}
        left={196}
        label="Reset (R)"
        active={store.isKeyResetActive}
        onMouseDown={() => mouseDownHandler('r')}
        onMouseUp={() => mouseUpHandler('r')}
        onTouchStart={() => touchStartHandler('r')}
        onTouchEnd={() => keyUpEventHandler('r', store)}
      />
      <Button
        color="green"
        size="btn-sm"
        top={0}
        left={106}
        label="Sound(S)"
        active={store.isKeySoundActive}
        onMouseDown={() => mouseDownHandler('s')}
        onMouseUp={() => mouseUpHandler('s')}
        onTouchStart={() => touchStartHandler('s')}
        onTouchEnd={() => keyUpEventHandler('s', store)}
      />
      <Button
        color="green"
        size="btn-sm"
        top={0}
        left={16}
        label="Pause(P)"
        active={store.isKeyPauseActive}
        onMouseDown={() => mouseDownHandler('s')}
        onMouseUp={() => mouseUpHandler('s')}
        onTouchStart={() => touchStartHandler('s')}
        onTouchEnd={() => keyUpEventHandler('s', store)}
      />
    </KeyboardContainer>
  );
};
