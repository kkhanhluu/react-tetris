import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './GameBoard.module.scss';
import * as actions from '../../../store/actions/index';
import { timeInterval } from '../../../constants/index';

const GameBoard = (props) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boardGame.board);

  useEffect(() => {
    dispatch(actions.initBoard());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(actions.blockFall());
    const interval = setInterval(() => {
      dispatch(actions.blockFall());
    }, timeInterval);

    dispatch(actions.setFallInterval(interval));

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const boardGame = board.map((line, lineIndex) => (
    <div key={`${lineIndex}`} className={classes.line}>
      {line.map((cell, cellIndex) => (
        <div
          key={`${lineIndex}:${cellIndex}`}
          className={
            cell === 0 ? classes.cell : classes.filled + ' ' + classes.cell
          }
        ></div>
      ))}
    </div>
  ));
  return (
    board.length > 0 && <div className={classes.gameBoard}>{boardGame}</div>
  );
};

export default GameBoard;
