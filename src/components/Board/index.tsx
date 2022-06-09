import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { useStore } from 'store';
import { StyledBoard, Tile } from './style';

export const Board: FunctionComponent = () => {
  const { matrix } = useStore();

  return (
    <StyledBoard className="game-board">
      {matrix.map(({ isFilled, isAnimated }, index) => (
        <Tile
          key={index}
          className={classNames({
            filled: isFilled,
            animated: isAnimated,
          })}
        />
      ))}
    </StyledBoard>
  );
};
