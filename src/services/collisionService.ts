import { MatrixUtil } from 'helpers';
import { TetrisState } from 'store';

export function doesCollideBottom(state: TetrisState): boolean {
  if (state.currentPiece && state.currentPiece.bottomRow >= MatrixUtil.HEIGHT) {
    return true;
  }
  return doesCollide(state);
}

export function doesCollideLeft(state: TetrisState): boolean {
  if (state.currentPiece && state.currentPiece.leftCol < 0) {
    return true;
  }
  return doesCollide(state);
}

export function doesCollideRight(state: TetrisState): boolean {
  if (state.currentPiece && state.currentPiece.rightCol >= MatrixUtil.WIDTH) {
    return true;
  }
  return doesCollide(state);
}

export function doesCollide(state: TetrisState): boolean {
  return (
    state.currentPiece?.positionOnGrid.some(
      (position) => state.matrix[position].isSolid,
    ) ?? false
  );
}
