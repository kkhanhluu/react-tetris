import {
  Container,
  Panel,
  Rect,
  ScreenContainer,
  StateContainer,
} from 'App.style';
import classNames from 'classnames';
import { Board } from 'components/Board';
import { Clock } from 'components/Clock';
import { Decoration } from 'components/Decoration';
import { Keyboard } from 'components/Keyboard';
import { Level } from 'components/Level';
import { Line } from 'components/Line';
import { Logo } from 'components/Logo';
import { Music } from 'components/Music';
import { NextPiece } from 'components/NextPiece';
import { Pause } from 'components/Pause';
import { Point } from 'components/Point';
import { Social } from 'components/Social';
import { MatrixUtil } from 'helpers';
import useInterval from 'hooks/useInterval';
import { GameStatus } from 'models/gameStatus';
import React, { CSSProperties, useRef } from 'react';
import {
  keyDownEventHandler,
  keyUpEventHandler,
} from 'services/keyboardService';
import { update } from 'services/tetrisService';
import { useStore } from 'store';

function App() {
  const store = useStore();
  const ref = useRef(store);
  ref.current = store;

  useInterval(
    () => {
      update(ref.current);
    },
    ref.current.paused || ref.current.status !== GameStatus.Started
      ? null
      : MatrixUtil.getSpeedDelay(ref.current.speed),
  );

  function onKeyDown({ key }: React.KeyboardEvent) {
    keyDownEventHandler(key, ref.current);
  }

  function onKeyUp({ key }: React.KeyboardEvent) {
    keyUpEventHandler(key, ref.current);
  }

  let filling = 0;
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  const ratio = h / w;
  let scale;
  let css: CSSProperties = {};
  if (ratio < 1.5) {
    scale = h / 960;
  } else {
    scale = w / 640;
    filling = (h - 960 * scale) / scale / 3;
    css = {
      paddingTop: Math.floor(filling) + 42,
      paddingBottom: Math.floor(filling),
      marginTop: Math.floor(-480 - filling * 1.5),
    };
  }
  css.transform = `scale(${scale})`;

  return (
    <div
      role="button"
      style={{ width: '100vw', height: '100vh' }}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      <Container style={css}>
        <Rect
          className={classNames({
            drop: store.isKeyDropActive && store.status === GameStatus.Started,
          })}
        >
          <Decoration />
          <ScreenContainer>
            <Panel>
              <Board />
              <Logo />
              <StateContainer className="state">
                <Point />
                <Line />
                <Level />
                <NextPiece />
                <div className="last-row">
                  <Clock />
                  <Pause />
                  <Music />
                </div>
              </StateContainer>
            </Panel>
          </ScreenContainer>
        </Rect>
        <Keyboard />
        <Social />
      </Container>
    </div>
  );
}

export default App;
