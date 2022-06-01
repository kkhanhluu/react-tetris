import { Stage } from 'components/Stage';
import { checkCollision, createStage } from 'helpers';
import { usePlayer } from 'hooks/usePlayer';
import { useStage } from 'hooks/useStage';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [dropTime, setDropTime] = useState();
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  function startGame() {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  }

  function movePlayer(direction: number) {
    if (checkCollision(player, stage, { moveX: direction, moveY: 0 })) {
      return;
    }
    updatePlayerPos({ x: direction, y: 0 });
  }

  function drop() {
    if (checkCollision(player, stage, { moveX: 0, moveY: 1 })) {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(undefined);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    } else {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    }
  }

  function move({ key }: React.KeyboardEvent): void {
    if (gameOver) {
      return;
    }

    switch (key) {
      case 'ArrowLeft':
        movePlayer(-1);
        break;
      case 'ArrowRight':
        movePlayer(1);
        break;
      case 'ArrowDown':
        drop();
        break;
      default:
        return;
    }
  }

  return (
    <div
      className="App"
      style={{ width: '100vw', height: '100vh' }}
      role="button"
      tabIndex={0}
      onKeyDown={move}
    >
      <Stage stage={stage} />
      {gameOver ? 'Game over' : null}
      <button onClick={startGame}>Start game</button>
    </div>
  );
}

export default App;
