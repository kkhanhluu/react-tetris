import { GameStatus } from 'models/gameStatus';
import { FilledTile } from 'models/tile/filledTile';
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
  if (state.locked || !state.currentPiece || doesCollideLeft(state)) {
    return;
  }
  state.currentPiece.store();
  state.setCurrentPiece(state.currentPiece.moveLeft());
  if (doesCollideLeft(state)) {
    state.currentPiece.revert();
  }
  drawPiece(state);
}

export function moveRight(state: TetrisState) {
  if (state.locked || !state.currentPiece || doesCollideRight(state)) {
    return;
  }
  state.currentPiece.store();
  state.setCurrentPiece(state.currentPiece.moveRight());
  if (doesCollideRight(state)) {
    state.currentPiece.revert();
  }
  drawPiece(state);
}

export function update(state: TetrisState) {
  if (state.locked || !state.currentPiece || doesCollideBottom(state)) {
    return;
  }
  state.setLocked(true);
  state.currentPiece.store();
  state.setCurrentPiece(state.currentPiece.moveDown());
  if (doesCollideBottom(state)) {
    state.currentPiece.revert();
  }
  drawPiece(state);
  state.setLocked(false);
}

function drawPiece(state: TetrisState) {
  // this._setCurrentPiece(this._current.clearStore());
  const newMatrix = structuredClone(state.matrix);
  state.currentPiece?.positionOnGrid.forEach((position) => {
    const { isSolid } = newMatrix[position];
    newMatrix[position] = new FilledTile(isSolid);
  });
  state.setMatrix(newMatrix);
  // for (let row = 0;)
  // this._loopThroughPiecePosition((position) => {
  //   this._updateMatrix(position, new FilledTile(isSolid));
  // });
}
