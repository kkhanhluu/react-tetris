import { Tile } from 'components/Tile';
import { MatrixUtil } from 'helpers';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { clearFullLines } from 'services/tetrisService';
import { useStore } from 'store';
import { StyledBoard } from './style';

export const Board: FunctionComponent = () => {
  const store = useStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [fullRows, setFullRows] = useState<number[]>();
  const [isClearingFullRows, setIsClearingFullRows] = useState(false);

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

  useEffect(() => {
    const newFullRows = MatrixUtil.getFullRowsOfBoard(store.matrix);
    const shouldClearFullRow = newFullRows.length > 0;
    if (shouldClearFullRow && !isClearingFullRows) {
      clearingAnimation();
      setFullRows(newFullRows);
    }
    setIsClearingFullRows(shouldClearFullRow);
  }, [store.matrix, isClearingFullRows, clearingAnimation]);

  const animatingRows = fullRows?.map((row) => ({
    min: row * MatrixUtil.WIDTH,
    max: row * MatrixUtil.WIDTH + MatrixUtil.WIDTH,
  }));

  return (
    <StyledBoard className="game-board">
      {store.matrix.map(({ isFilled, isSolid, isAnimated }, index) => {
        const shouldCellBeAnimated = animatingRows?.some(
          ({ min, max }) => index >= min && index <= max,
        );
        return (
          <Tile
            index={index}
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
