import React from 'react';
import logo from './logo.svg';
import './App.css';
import Gameboy from './components/Gameboy/Gameboy';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions/index';
function App() {
  const gameOver = useSelector((state) => state.boardGame.gameover);
  const fallInterval = useSelector((state) => state.boardGame.fallInterval);

  const dispatch = useDispatch();
  if (gameOver) {
    clearInterval(fallInterval);
    dispatch(actions.removeInterval());
    alert('GAME OVER!!!');
  }
  return (
    <div className='App'>
      <Gameboy />
    </div>
  );
}

export default App;
