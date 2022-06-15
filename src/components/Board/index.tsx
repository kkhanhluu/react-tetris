import { Tile } from 'components/Tile';
import { MatrixUtil } from 'helpers';
import { Tile as TileModel } from 'models/tile/tile';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { AudioService } from 'services/audioService';
import { clearFullLines } from 'services/tetrisService';
import { useStore } from 'store';
import { StyledBoard } from './style';

export const Board: FunctionComponent = () => {
  const store = useStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [fullRows, setFullRows] = useState<number[]>();
  const [isClearingFullRows, setIsClearingFullRows] = useState(false);
  const [overState, setOverState] = useState<TileModel[]>();
  const [isOver, setIsOver] = useState(false);

  const clearingAnimation = useCallback(() => {
    function animation(callback: () => void) {
      setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
          callback();
        }, 100);
      }, 100);
    }
    animation(() => {
      animation(() => {
        animation(() => {
          setTimeout(() => {
            clearFullLines(store);
          }, 100);
        });
      });
    });
  }, [store]);

  const resettingAnimation = useCallback(() => {
    setOverState([...store.matrix]);
    const newOverState = [...store.matrix];

    for (let i = 0; i <= 40; i++) {
      setTimeout(() => {
        if (i <= 19) {
          newOverState.splice(
            (19 - i) * MatrixUtil.WIDTH,
            MatrixUtil.WIDTH,
            ...MatrixUtil.FullRow,
          );
          setOverState([...newOverState]);
        } else if (i >= 20 && i <= 39) {
          newOverState.splice(
            (i - 20) * MatrixUtil.WIDTH,
            MatrixUtil.WIDTH,
            ...MatrixUtil.EmptyRow,
          );
          setOverState(() => {
            return [...newOverState];
          });
        } else {
          store.setMatrix(MatrixUtil.getStartBoard());
          store.setIsResetting(false);
          store.setLocked(false);
          store.setNumberOfClearedLines(0);
          return;
        }
      }, 40 * (i + 1));
    }
  }, [store]);

  useEffect(() => {
    const newFullRows = MatrixUtil.getFullRowsOfBoard(store.matrix);
    const shouldClearFullRow = newFullRows.length > 0;
    if (shouldClearFullRow && !isClearingFullRows) {
      AudioService.clear(store.isSoundOn);
      clearingAnimation();
      setFullRows(newFullRows);
    } else if (store.isResetting && !isOver) {
      resettingAnimation();
    }
    setIsOver(store.isResetting);
    setIsClearingFullRows(shouldClearFullRow);
  }, [
    store.matrix,
    store.isResetting,
    store.isSoundOn,
    isOver,
    isClearingFullRows,
    clearingAnimation,
    resettingAnimation,
  ]);

  const animatingRows = fullRows?.map((row) => ({
    min: row * MatrixUtil.WIDTH,
    max: (row + 1) * MatrixUtil.WIDTH - 1,
  }));

  const board = isOver ? (overState as TileModel[]) : store.matrix;

  return (
    <StyledBoard className="game-board">
      {board.map(({ isFilled, isSolid, isAnimated }, index) => {
        const shouldCellBeAnimated = animatingRows?.some(
          ({ min, max }) => index >= min && index <= max,
        );
        return (
          <Tile
            key={index}
            isAnimated={
              (isAnimating && shouldCellBeAnimated) ||
              (isAnimated && !isClearingFullRows)
            }
            isFilled={isFilled}
            isSolid={isSolid}
          />
        );
      })}
    </StyledBoard>
  );
};
