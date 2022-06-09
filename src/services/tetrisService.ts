import { GameStatus } from 'models/gameStatus';
import { FilledTile } from 'models/tile/filledTile';
import { TetrisState } from 'store';

export function start(state: TetrisState) {
  if (!state.currentPiece) {
    state.setCurrentPiece(state.nextPiece);
    setNextPiece(state);
  }
  state.setGameStatus(GameStatus.Started);
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
  state.setCurrentPiece(state.currentPiece.moveLeft());
  drawPiece(state);
}

export function moveRight(state: TetrisState) {
  if (state.locked || !state.currentPiece) {
    return;
  }
  state.setCurrentPiece(state.currentPiece.moveRight());
  drawPiece(state);
}

function setNextPiece(state: TetrisState) {
  state.setNextPiece(state.pieceUtil.getRandomPiece());
}

function update(state: TetrisState) {
  if (!state.currentPiece) {
    return;
  }
  state.setLocked(true);
  state.setCurrentPiece(state.currentPiece.moveDown());
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
