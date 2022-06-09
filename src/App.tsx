import { Board } from 'components/Board';
import { Colors } from 'helpers';
import { moveDown, moveLeft, moveRight, start } from 'services/tetrisService';
import { useStore } from 'store';
import styled from 'styled-components';
import './App.css';

const Container = styled.div`
  width: 640px;
  padding-top: 40px;
  box-shadow: 0 0 10px ${Colors.white} inset;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -480px 0 0 -320px;
  background: ${Colors.yellow};
`;

const React = styled.div`
  width: 480px;
  padding: 45px 0 35px;
  border: ${Colors.black} solid;
  border-width: 0 10px 10px;
  margin: 0 auto;
  position: relative;
  &.drop {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
`;

const Screen = styled.div`
  width: 390px;
  height: 478px;
  border: solid 5px;
  border-color: #987f0f #fae36c #fae36c #987f0f;
  margin: 0 auto;
  position: relative;
`;

const Panel = styled.div`
  width: 380px;
  height: 468px;
  margin: 0 auto;
  background: #9ead86;
  padding: 8px;
  border: 2px solid #494536;
`;

function App() {
  const store = useStore();

  function onKeyDown({ key }: React.KeyboardEvent) {
    switch (key) {
      case 's':
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
        <React>
          <Screen>
            <Panel>
              <Board />
            </Panel>
          </Screen>
        </React>
      </Container>
    </div>
  );
}

export default App;
