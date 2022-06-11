import {
  Container,
  Panel,
  Rect,
  ScreenContainer,
  StateContainer,
} from 'App.style';
import { Board } from 'components/Board';
import { Clock } from 'components/Clock';
import { Decoration } from 'components/Decoration';
import { Keyboard } from 'components/Keyboard';
import { Level } from 'components/Level';
import { Line } from 'components/Line';
import { Music } from 'components/Music';
import { NextPiece } from 'components/NextPiece';
import { Pause } from 'components/Pause';
import { Point } from 'components/Point';
import { MatrixUtil } from 'helpers';
import useInterval from 'hooks/useInterval';
import { GameStatus } from 'models/gameStatus';
import React, { CSSProperties, useRef } from 'react';
import {
  drop,
  moveDown,
  moveLeft,
  moveRight,
  pause,
  reset,
  resume,
  rotate,
  start,
  update,
} from 'services/tetrisService';
import { useStore } from 'store';

function App() {
  const store = useStore();
  const ref = useRef(store);
  ref.current = store;

  useInterval(() => {
    update(ref.current);
  }, MatrixUtil.getSpeedDelay(ref.current.speed));

  function onKeyDown({ key }: React.KeyboardEvent) {
    switch (key) {
      case ' ':
        store.setKey({ isKeyDropActive: true });
        if (store.currentPiece) {
          drop(store);
          return;
        }
        start(store);
        break;
      case 'ArrowDown':
        store.setKey({ isKeyDownActive: true });
        moveDown(store);
        break;
      case 'ArrowLeft':
        store.setKey({ isKeyLeftActive: true });
        moveLeft(store);
        break;
      case 'ArrowRight':
        store.setKey({ isKeyRightActive: true });
        moveRight(store);
        break;
      case 'ArrowUp':
        store.setKey({ isKeyUpActive: true });
        rotate(store);
        break;
      case 'r':
        store.setKey({ isKeyResetActive: true });
        reset(store);
        break;
      case 'p':
        store.setKey({ isKeyPauseActive: true });
        if (store.status !== GameStatus.Started) {
          resume(store);
        } else {
          pause(store);
        }
        break;
      case 's':
        store.setKey({ isKeySoundActive: true });
        store.toggleSoundOn();
        break;
      default:
        break;
    }
  }

  function onKeyUp({ key }: React.KeyboardEvent) {
    switch (key) {
      case ' ':
        store.setKey({ isKeyDropActive: false });
        break;
      case 'ArrowDown':
        store.setKey({ isKeyDownActive: false });
        break;
      case 'ArrowLeft':
        store.setKey({ isKeyLeftActive: false });
        break;
      case 'ArrowRight':
        store.setKey({ isKeyRightActive: false });
        break;
      case 'ArrowUp':
        store.setKey({ isKeyUpActive: false });
        break;
      case 'r':
        store.setKey({ isKeyResetActive: false });
        break;
      case 'p':
        store.setKey({ isKeyPauseActive: false });
        break;
      case 's':
        store.setKey({ isKeySoundActive: false });
        break;
      default:
        break;
    }
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
        <Rect>
          <Decoration />
          <ScreenContainer>
            <Panel>
              <Board />
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
      </Container>
    </div>
  );
}

export default App;
