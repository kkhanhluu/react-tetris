import { STAGE_HEIGHT, STAGE_WIDTH } from './constants';
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
  const shapes = Object.values(Shape);
  return shapes[Math.floor(Math.random() * shapes.length - 1)];
}
