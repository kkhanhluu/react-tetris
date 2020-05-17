import React from 'react';

import classes from './GameBoard.module.scss';

let matrix = new Array(20);
for (let i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(10).fill(0);
}

const GameBoard = (props) => {
  console.log(matrix);
  const boardGame = matrix.map((line) => (
    <div className={classes.line}>
      {line.map((cell) => (
        <div className={classes.cell}></div>
      ))}
    </div>
  ));
  return <div className={classes.gameBoard}>{boardGame}</div>;
};

export default GameBoard;
