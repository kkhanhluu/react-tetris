import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { StyledTile } from './style';

export const Tile: FunctionComponent<{
  isFilled?: boolean;
  isSolid?: boolean;
  isAnimated?: boolean;
  index: number;
}> = ({ index, isAnimated = false, isFilled = false, isSolid = false }) => {
  return (
    <StyledTile
      className={classNames({
        filled: isFilled || isSolid,
        animated: isAnimated,
        [index]: true,
      })}
    />
  );
};
