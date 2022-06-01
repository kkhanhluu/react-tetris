import { PlayerState } from 'hooks/usePlayer';
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
  const shapes = Object.values(Shape);
  return shapes[Math.floor(Math.random() * (shapes.length - 1))];
}

export function getShapeFromString(value: string) {
  switch (value) {
    case 'I':
      return Shape.I;
    case 'J':
      return Shape.J;
    case 'L':
      return Shape.L;
    case 'O':
      return Shape.O;
    case 'S':
      return Shape.S;
    case 'T':
      return Shape.T;
    case 'Z':
      return Shape.Z;
    case '0':
      return Shape.EMPTY;
    default:
      return Shape.EMPTY;
  }
}

export function checkCollision(
  player: PlayerState,
  stage: CellObject[][],
  { moveX, moveY }: { moveX: number; moveY: number },
) {
  for (let row = 0; row < TETROMINOS[player.tetromino].shape.length; row++) {
    for (
      let column = 0;
      column < TETROMINOS[player.tetromino].shape[row].length;
      column++
    ) {
      if (TETROMINOS[player.tetromino].shape[row][column] !== '0') {
        if (
          // inside game area vertically
          !stage[row + player.pos.y + moveY] ||
          // inside game area horizontally
          !stage[row + player.pos.y + moveY][column + player.pos.x + moveX] ||
          // check the cell we're moving to isn't clear
          stage[row + player.pos.y + moveY][column + player.pos.x + moveX]
            .status !== CellStatus.CLEAR
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
