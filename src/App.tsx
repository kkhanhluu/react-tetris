import { Stage } from 'components/Stage';
import { usePlayer } from 'hooks/usePlayer';
import { useStage } from 'hooks/useStage';
import { useState } from 'react';
import './App.css';

function App() {
  const [dropTime, setDropTime] = useState();
  const [gameOver, setGameOver] = useState(false);

  const [stage] = useStage();
  const [player] = usePlayer();

  return (
    <div className="App">
      <Stage stage={stage} />
      {gameOver ? 'Game over' : null}
    </div>
  );
}

export default App;
