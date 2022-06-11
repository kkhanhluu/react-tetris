import { MatrixUtil, PieceUtil } from 'helpers';
import { GameStatus } from 'models/gameStatus';
import { EmptyTile } from 'models/tile/emptyTile';
import { FilledTile } from 'models/tile/filledTile';
import { Tile } from 'models/tile/tile';
import { TetrisState } from 'store';
import {
  doesCollideBottom,
  doesCollideLeft,
  doesCollideRight,
} from './collisionService';

export function start(state: TetrisState) {
  if (!state.currentPiece) {
    state.setCurrentPiece(state.nextPiece);
    state.setNextPiece(state.pieceUtil.getRandomPiece());
  }
  state.setGameStatus(GameStatus.Started);
  state.setSpeed(1);
  state.setLocked(false);
  // TODO: update other game state like started, point, speed,...
}

export function moveDown(state: TetrisState) {
  update(state);
}

export function moveLeft(state: TetrisState) {
  if (state.locked || !state.currentPiece) {
    return;
  }
  state.setCurrentPiece(state.currentPiece.store());
  state.setCurrentPiece(state.currentPiece.moveLeft());
  if (doesCollideLeft(state)) {
    state.currentPiece.revert();
  }
  drawPiece(state);
}

export function moveRight(state: TetrisState) {
  if (state.locked || !state.currentPiece) {
    return;
  }
  state.setCurrentPiece(state.currentPiece.store());
  state.setCurrentPiece(state.currentPiece.moveRight());
  if (doesCollideRight(state)) {
    state.currentPiece.revert();
  }
  drawPiece(state);
}

export function rotate(state: TetrisState) {
  if (state.locked || !state.currentPiece) {
    return;
  }

  clearPiece(state);
  state.setCurrentPiece(state.currentPiece.store());
  state.setCurrentPiece(state.currentPiece.rotate());

  while (doesCollideRight(state)) {
    state.setCurrentPiece(state.currentPiece.moveLeft());
    if (doesCollideLeft(state)) {
      state.setCurrentPiece(state.currentPiece.revert());
      break;
    }
  }
  drawPiece(state);
}

export function drop(state: TetrisState) {
  if (state.locked || !state.currentPiece) {
    return;
  }
  while (!doesCollideBottom(state)) {
    clearPiece(state);
    state.setCurrentPiece(state.currentPiece.store());
    state.setCurrentPiece(state.currentPiece.moveDown());
  }
  state.setCurrentPiece(state.currentPiece.revert());
  drawPiece(state);
}

export function update(state: TetrisState) {
  if (state.locked || !state.currentPiece) {
    return;
  }
  state.setLocked(true);
  state.setCurrentPiece(state.currentPiece.revert());
  clearPiece(state);
  state.setCurrentPiece(state.currentPiece.store());
  state.setCurrentPiece(state.currentPiece.moveDown());

  if (doesCollideBottom(state)) {
    state.setCurrentPiece(state.currentPiece.revert());

    // draw filled tile in board
    const newMatrix = structuredClone(state.matrix);
    state.currentPiece.revert()?.positionOnGrid.forEach((position) => {
      newMatrix[position] = new FilledTile(true);
    });
    clearFullLines(newMatrix);
    state.setMatrix(newMatrix);

    state.setCurrentPiece(state.nextPiece);
    state.setNextPiece(state.pieceUtil.getRandomPiece());
    state.setLocked(false);

    if (isGameOver(state)) {
      onGameOver(state);
    }
    return;
  }

  drawPiece(state);
  state.setLocked(false);
}

export function reset(state: TetrisState) {
  createInitialState(state);
}

function drawPiece(state: TetrisState) {
  if (state.currentPiece) {
    state.setCurrentPiece(state.currentPiece.clearStore());
  }
  const newMatrix = structuredClone(state.matrix);
  state.currentPiece?.positionOnGrid.forEach((position) => {
    const { isSolid } = state.matrix[position];
    newMatrix[position] = new FilledTile(isSolid);
  });
  state.setMatrix(newMatrix);
}

function clearPiece(state: TetrisState) {
  const newMatrix = structuredClone(state.matrix);
  state.currentPiece?.positionOnGrid.forEach((position) => {
    newMatrix[position] = new EmptyTile();
  });
  state.setMatrix(newMatrix);
}

function clearFullLines(newMatrix: Tile[]) {
  for (let rowIndex = MatrixUtil.HEIGHT - 1; rowIndex >= 0; rowIndex--) {
    const row = newMatrix.slice(
      rowIndex * MatrixUtil.WIDTH,
      (rowIndex + 1) * MatrixUtil.WIDTH,
    );
    const isRowFullySolid = row.every((cell) => cell.isSolid);
    if (isRowFullySolid) {
      const topPortion = newMatrix.slice(0, rowIndex * MatrixUtil.WIDTH);
      newMatrix.splice(
        0,
        ++rowIndex * MatrixUtil.WIDTH,
        ...MatrixUtil.EmptyRow.concat(topPortion),
      );
    }
  }
}

function isGameOver(state: TetrisState) {
  console.log(state.matrix.slice(0, MatrixUtil.WIDTH));
  return state.matrix.slice(0, MatrixUtil.WIDTH).some((cell) => cell.isSolid);
}

function onGameOver(state: TetrisState) {
  alert('Game Over');
  createInitialState(state);
}

function createInitialState(state: TetrisState) {
  const pieceUtil = new PieceUtil();
  state.setGameStatus(GameStatus.Over);
  state.setMatrix(MatrixUtil.getStartBoard());
  state.setCurrentPiece(null);
  state.setLocked(true);
  state.setPieceUtil(pieceUtil);
  state.setNextPiece(pieceUtil.getRandomPiece());
}
