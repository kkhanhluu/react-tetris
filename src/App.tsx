import { Container, Panel, Rect, ScreenContainer } from 'App.style';
import { Board } from 'components/Board';
import { Decoration } from 'components/Decoration';
import { Keyboard } from 'components/Keyboard';
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
        if (store.currentPiece) {
          drop(store);
          return;
        }
        start(store);
        break;
      case 'ArrowDown':
        moveDown(store);
        break;
      case 'ArrowLeft':
        moveLeft(store);
        break;
      case 'ArrowRight':
        moveRight(store);
        break;
      case 'ArrowUp':
        rotate(store);
        break;
      case 'r':
        reset(store);
        break;
      case 'p':
        if (store.status !== GameStatus.Started) {
          resume(store);
        } else {
          pause(store);
        }
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
    >
      <Container style={css}>
        <Rect>
          <Decoration />
          <ScreenContainer>
            <Panel>
              <Board />
            </Panel>
          </ScreenContainer>
        </Rect>
        <Keyboard />
      </Container>
    </div>
  );
}

export default App;
