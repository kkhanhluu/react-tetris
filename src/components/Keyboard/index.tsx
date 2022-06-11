import { Button } from 'components/Keyboard/Button';
import { FunctionComponent } from 'react';
import { KeyboardContainer } from './style';

export const Keyboard: FunctionComponent = () => {
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
        active={false}
      />
      <Button
        color="blue"
        size="btn-md"
        top={180}
        left={374}
        label="Down"
        arrow="translate(0,-71px) rotate(180deg)"
        active={false}
      />
      <Button
        color="blue"
        size="btn-md"
        top={90}
        left={284}
        label="Left"
        arrow="translate(60px, -12px) rotate(270deg)"
        active={false}
      />
      <Button
        color="blue"
        size="btn-md"
        top={90}
        left={464}
        label="Right"
        arrow="translate(-60px, -12px) rotate(90deg)"
        active={false}
      />
      <Button
        color="blue"
        size="btn-lg"
        top={100}
        left={52}
        label="Drop (SPACE)"
        active={false}
      />
      <Button
        color="red"
        size="btn-sm"
        top={0}
        left={196}
        label="Reset (R)"
        active={false}
      />
      <Button
        color="green"
        size="btn-sm"
        top={0}
        left={106}
        label="Sound(S)"
        active={false}
      />
      <Button
        color="green"
        size="btn-sm"
        top={0}
        left={16}
        label="Pause(P)"
        active={false}
      />
    </KeyboardContainer>
  );
};
