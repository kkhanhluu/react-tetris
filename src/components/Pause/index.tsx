import classNames from 'classnames';
import useInterval from 'hooks/useInterval';
import { GameStatus } from 'models/gameStatus';
import { FunctionComponent, useState } from 'react';
import { useStore } from 'store';
import styled from 'styled-components';

const PauseContainer = styled.div`
  width: 20px;
  height: 18px;
  background-position: -100px -75px;
  position: absolute;
  top: 3px;
  left: 18px;
  &.c {
    background-position: -75px -75px;
  }
`;

export const Pause: FunctionComponent = () => {
  const store = useStore();
  const [visible, setVisible] = useState<boolean>();

  useInterval(() => {
    setVisible((prev) => !prev);
  }, 500);

  return (
    <PauseContainer
      className={classNames({
        bg: true,
        c: visible && store.status === GameStatus.Paused,
      })}
    />
  );
};
