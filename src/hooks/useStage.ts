import { createStage, getShapeFromString } from 'helpers';
import { TETROMINOS } from 'helpers/constants';
import { CellObject, CellStatus, Shape } from 'helpers/types';
import { useEffect, useState } from 'react';
import { PlayerState } from './usePlayer';

export function useStage(
  player: PlayerState,
  resetPlayer: () => void,
): [CellObject[][], React.Dispatch<React.SetStateAction<CellObject[][]>>] {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    setStage((prevStage) => {
      // Flush the stage
      const newStage: CellObject[][] = prevStage.map((row) =>
        row.map((cell) =>
          cell.status === CellStatus.CLEAR
            ? { shape: Shape.EMPTY, status: CellStatus.CLEAR }
            : cell,
        ),
      );

      // draw the tetromino
      TETROMINOS[player.tetromino].shape.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
          if (column !== '0') {
            newStage[rowIndex + player.pos.y][columnIndex + player.pos.x] = {
              shape: getShapeFromString(column),
              status: player.collided ? CellStatus.MERGED : CellStatus.CLEAR,
            };
          }
        });
      });

      if (player.collided) {
        resetPlayer();
      }

      return newStage;
    });
  }, [player, resetPlayer]);

  return [stage, setStage];
}
