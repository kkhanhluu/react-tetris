import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { StyledNumber } from './style';

export const Number: FunctionComponent<{ number: number; length?: number }> = ({
  number,
  length = 6,
}) => {
  return (
    <StyledNumber className="number">
      {number
        .toString()
        .padStart(length, 'n')
        .split('')
        .map((sequence, index) => (
          <span
            key={index}
            className={classNames({
              bg: true,
              num: true,
              [`num-${sequence}`]: true,
            })}
          />
        ))}
    </StyledNumber>
  );
};
