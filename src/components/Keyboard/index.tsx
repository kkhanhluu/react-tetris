import { Button } from 'components/Keyboard/Button';
import { FunctionComponent } from 'react';
import {
  arrowDownButtonClickHandler,
  arrowLeftButtonClickHandler,
  arrowRightButtonClickHandler,
  arrowUpButtonClickHandler,
  pauseButtonClickHandler,
  resetButtonClickHandler,
  soundButtonClickHandler,
  spaceButtonClickHandler,
} from 'services/keyboardService';
import { useStore } from 'store';
import { KeyboardContainer } from './style';

export const Keyboard: FunctionComponent = () => {
  const store = useStore();
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
        onClick={() => arrowUpButtonClickHandler(store)}
        active={store.isKeyUpActive}
      />
      <Button
        color="blue"
        size="btn-md"
        top={180}
        left={374}
        label="Down"
        onClick={() => arrowDownButtonClickHandler(store)}
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
        onClick={() => arrowLeftButtonClickHandler(store)}
      />
      <Button
        color="blue"
        size="btn-md"
        top={90}
        left={464}
        label="Right"
        arrow="translate(-60px, -12px) rotate(90deg)"
        active={store.isKeyRightActive}
        onClick={() => arrowRightButtonClickHandler(store)}
      />
      <Button
        color="blue"
        size="btn-lg"
        top={100}
        left={52}
        label="Drop (SPACE)"
        active={store.isKeyDropActive}
        onClick={() => spaceButtonClickHandler(store)}
      />
      <Button
        color="red"
        size="btn-sm"
        top={0}
        left={196}
        label="Reset (R)"
        active={store.isKeyResetActive}
        onClick={() => resetButtonClickHandler(store)}
      />
      <Button
        color="green"
        size="btn-sm"
        top={0}
        left={106}
        label="Sound(S)"
        active={store.isKeySoundActive}
        onClick={() => soundButtonClickHandler(store)}
      />
      <Button
        color="green"
        size="btn-sm"
        top={0}
        left={16}
        label="Pause(P)"
        active={store.isKeyPauseActive}
        onClick={() => pauseButtonClickHandler(store)}
      />
    </KeyboardContainer>
  );
};
