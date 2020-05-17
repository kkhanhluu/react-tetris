import * as actionTypes from '../actions/actionTypes';
import { blockTypes, matrixWidth, matrixHeight } from '../../constants/index';
import Block from '../../models/block';

const initialState = {
  board: [],
  currentBlock: null,
  gameover: false,
  started: false,
  fallInterval: null,
};

const updateBoard = (originalBoard, block, actionType) => {
  const newBoard = [...originalBoard];

  updateMatrix(newBoard, block);
  clearLineBefore(actionType, newBoard, block);
  return newBoard;
};

const clearLineBefore = (actionType, board, block) => {
  if (actionType === actionTypes.BLOCK_FALL) {
    const tempY = block.y - 1;
    if (tempY >= 0 && tempY < matrixHeight) {
      for (let i = 0; i < matrixWidth; i++) {
        board[tempY][i] = 0;
      }
    }
  }
};

const updateMatrix = (board, block) => {
  block.shape.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const tempX = block.x + cellIndex;
      const tempY = block.y + rowIndex;
      if (
        tempY >= 0 &&
        tempY < matrixHeight &&
        tempX >= 0 &&
        tempX < matrixWidth
      ) {
        board[tempY][tempX] = cell;
      }
    });
  });
};

const checkCollison = (block, board, actionType) => {
  switch (actionType) {
    case actionTypes.BLOCK_FALL:
      const tempY = block.y + block.shape.length;
      if (tempY >= matrixHeight) {
        return true;
      } else {
        const lastRowShape = block.shape[block.shape.length - 1];
        for (let i = 0; i < lastRowShape.length; i++) {
          if (lastRowShape[i] === 1 && board[tempY][block.x + i] === 1) {
            return true;
          }
        }
        return false;
      }
    default:
      return false;
  }
};

const updateBlockFall = (block, board) => {
  if (!checkCollison(block, board, actionTypes.BLOCK_FALL)) {
    return block.fall();
  } else {
    return new Block({
      type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
    });
  }
};

const checkGameOver = (board, block) => {
  return (
    board[0].reduce((gameOver, cell) => gameOver || cell === 1, false) &&
    checkCollison(block, board, actionTypes.BLOCK_FALL)
  );
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_BOARD:
      let matrix = new Array(matrixHeight);
      for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(matrixWidth).fill(0);
      }

      return {
        ...state,
        board: matrix,
        currentBlock: new Block({
          type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
        }),
      };

    case actionTypes.BLOCK_FALL:
      console.log('falling');
      return {
        ...state,
        board: updateBoard(state.board, state.currentBlock, action.type),
        currentBlock: updateBlockFall(
          state.currentBlock,
          state.board,
          action.type
        ),
        gameover: checkGameOver(state.board, state.currentBlock),
      };
    case actionTypes.SET_FALL_INTERVAL:
      return {
        ...state,
        fallInterval: action.interval,
      };
    case actionTypes.REMOVE_INTERVAL:
      return {
        ...state,
        fallInterval: null,
      };
    default:
      return state;
  }
};

export default reducer;
