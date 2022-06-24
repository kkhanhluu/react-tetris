import { MatrixUtil, PieceUtil } from 'helpers';
import { GameStatus } from 'models/gameStatus';
import { Speed } from 'models/speed';
import { AnimatedTile } from 'models/tile/animatedTile';
import { EmptyTile } from 'models/tile/emptyTile';
import { FilledTile } from 'models/tile/filledTile';
import { Tile } from 'models/tile/tile';
import { TetrisState } from 'store';
import { AudioService } from './audioService';
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
  state.setSpeed(state.initSpeed);
  state.setLocked(false);
  state.setMatrix(MatrixUtil.getStartBoard(state.initNumberOfLines));
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
    const newMatrix = JSON.parse(JSON.stringify(state.matrix));
    state.currentPiece.revert()?.positionOnGrid.forEach((position) => {
      newMatrix[position] = new AnimatedTile(true);
    });
    state.setMatrix(newMatrix);

    if (MatrixUtil.getFullRowsOfBoard(newMatrix).length <= 0) {
      state.setCurrentPiece(state.nextPiece);
      state.setNextPiece(state.pieceUtil.getRandomPiece());
      state.setLocked(false);
    }

    if (isGameOver(state)) {
      onGameOver(state);
    }
    return;
  }

  drawPiece(state);
  state.setLocked(false);
}

export function reset(state: TetrisState) {
  if (
    state.status === GameStatus.Started ||
    state.status === GameStatus.Paused
  ) {
    state.setIsResetting(true);
    createInitialState(state);
  }
}

export function pause(state: TetrisState) {
  if (state.status === GameStatus.Paused) {
    return;
  }
  state.setLocked(true);
  state.setPaused(true);
  state.setGameStatus(GameStatus.Paused);
}

export function resume(state: TetrisState) {
  if (state.status === GameStatus.Started) {
    return;
  }
  state.setLocked(false);
  state.setPaused(false);
  state.setGameStatus(GameStatus.Started);
}
function drawPiece(state: TetrisState) {
  if (state.currentPiece) {
    state.setCurrentPiece(state.currentPiece.clearStore());
  }
  const newMatrix = JSON.parse(JSON.stringify(state.matrix));
  state.currentPiece?.positionOnGrid.forEach((position) => {
    const { isSolid } = state.matrix[position];
    newMatrix[position] = new FilledTile(isSolid);
  });
  state.setMatrix(newMatrix);
}

function clearPiece(state: TetrisState) {
  const newMatrix = JSON.parse(JSON.stringify(state.matrix));
  state.currentPiece?.positionOnGrid.forEach((position) => {
    newMatrix[position] = new EmptyTile();
  });
  state.setMatrix(newMatrix);
}

export function clearFullLines(state: TetrisState) {
  const newMatrix = JSON.parse(JSON.stringify(state.matrix));
  let numberOfFullLines = 0;
  for (let rowIndex = MatrixUtil.HEIGHT - 1; rowIndex >= 0; rowIndex--) {
    const row = newMatrix.slice(
      rowIndex * MatrixUtil.WIDTH,
      (rowIndex + 1) * MatrixUtil.WIDTH,
    );
    const isRowFullySolid = row.every((cell: Tile) => cell.isSolid);
    if (isRowFullySolid) {
      numberOfFullLines++;
      const topPortion = newMatrix.slice(0, rowIndex * MatrixUtil.WIDTH);
      newMatrix.splice(
        0,
        ++rowIndex * MatrixUtil.WIDTH,
        ...MatrixUtil.EmptyRow.concat(topPortion),
      );
    }
  }
  state.setMatrix(newMatrix);
  state.setCurrentPiece(state.nextPiece);
  state.setNextPiece(state.pieceUtil.getRandomPiece());
  setPointsAndSpeed(state, numberOfFullLines);
  state.setLocked(false);
}

function setPointsAndSpeed(state: TetrisState, numberOfClearedLines: number) {
  if (numberOfClearedLines === 0) {
    return;
  }
  const newClearedLines = state.numberOfClearedLines + numberOfClearedLines;
  const addedPoints =
    MatrixUtil.POINTS[numberOfClearedLines - 1] ?? MatrixUtil.POINTS.at(-1);

  const newSpeed = (state.initSpeed +
    Math.max(
      state.initSpeed + Math.floor(newClearedLines / (MatrixUtil.HEIGHT / 2)),
      6,
    )) as Speed;
  state.setPoint(addedPoints);
  state.setSpeed(newSpeed);
  state.setNumberOfClearedLines(newClearedLines);
}

function isGameOver(state: TetrisState) {
  return state.matrix.slice(0, MatrixUtil.WIDTH).some((cell) => cell.isSolid);
}

function onGameOver(state: TetrisState) {
  state.setIsResetting(true);
  createInitialState(state);
  AudioService.gameOver(state.isSoundOn);
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
