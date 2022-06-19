import classNames from 'classnames';
import useInterval from 'hooks/useInterval';
import { GameStatus } from 'models/gameStatus';
import { FunctionComponent, useRef, useState } from 'react';
import { useStore } from 'store';
import { LogoContainer } from './style';

export const Logo: FunctionComponent = () => {
  const counter = useRef(0);
  const [className, setClassName] = useState('');

  useInterval(() => {
    const state = counter.current % 1000 >= 500 ? 1 : 2;
    setClassName(`l${state}`);
  }, 600);

  useInterval(() => {
    counter.current++;
    let side = 'r';
    if (
      counter.current % 10 === 0 ||
      counter.current % 20 === 0 ||
      counter.current % 30 === 0
    ) {
      side = side === 'r' ? 'l' : 'r';
    }
    const state = counter.current % 2 === 0 ? 3 : 4;
    setClassName(`${side}${state}`);
  }, 100);

  const store = useStore();
  const showLogo =
    !store.isResetting &&
    (store.status === GameStatus.Loading || store.status === GameStatus.Over);

  return showLogo ? (
    <LogoContainer>
      <div
        className={classNames({
          bg: true,
          dragon: true,
          [className]: true,
        })}
      />
      <p>Press SPACE to start</p>
    </LogoContainer>
  ) : null;
};
