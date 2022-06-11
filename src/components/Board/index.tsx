import { Tile } from 'components/Tile';
import { FunctionComponent } from 'react';
import { useStore } from 'store';
import { StyledBoard } from './style';

export const Board: FunctionComponent = () => {
  const { matrix } = useStore();

  return (
    <StyledBoard className="game-board">
      {matrix.map(({ isFilled, isAnimated, isSolid }, index) => {
        return (
          <Tile
            key={index}
            isAnimated={isAnimated}
            isFilled={isFilled}
            isSolid={isSolid}
          />
        );
      })}
    </StyledBoard>
  );
};
