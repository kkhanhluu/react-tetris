import { Container, Panel, ReactContainer, ScreenContainer } from 'App.style';
import { Board } from 'components/Board';
import { MatrixUtil } from 'helpers';
import useInterval from 'hooks/useInterval';
import React, { useRef } from 'react';
import {
  drop,
  moveDown,
  moveLeft,
  moveRight,
  reset,
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
      default:
        break;
    }
  }

  return (
    <div
      role="button"
      style={{ width: '100vw', height: '100vh' }}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Container>
        <ReactContainer>
          <ScreenContainer>
            <Panel>
              <Board />
            </Panel>
          </ScreenContainer>
        </ReactContainer>
      </Container>
    </div>
  );
}

export default App;
