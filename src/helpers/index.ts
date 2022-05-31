import { STAGE_HEIGHT, STAGE_WIDTH, TETROMINOS } from './constants';
import { CellObject, CellStatus, Shape } from './types';

export function createStage(): Array<Array<CellObject>> {
  return new Array(STAGE_HEIGHT).fill(null).map(() =>
    new Array(STAGE_WIDTH).fill({
      shape: Shape.EMPTY,
      status: CellStatus.CLEAR,
    }),
  );
}

export function randomTetromino() {
  const tetrominos = 'IJLOSTZ';
  return TETROMINOS[tetrominos[Math.floor(Math.random() * tetrominos.length)]];
}
