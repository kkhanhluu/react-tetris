import { TETROMINOS } from 'helpers/constants';
import { CellObject, Shape } from 'helpers/types';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledCell = styled.div<{ type: Shape; color: string }>`
  width: auto;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) =>
    props.type === Shape.EMPTY ? '0px solid' : '4px solid'};
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-right-color: rgba(${(props) => props.color}, 1);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-left-color: rgba(${(props) => props.color}, 0.3);
`;

const StyledStage = styled.div<{ height: number; width: number }>`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(25vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;

export const Stage: FunctionComponent<{ stage: CellObject[][] }> = ({
  stage,
}) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map((row) =>
        row.map((cell, index) => (
          <StyledCell
            key={index}
            type={cell.shape}
            color={TETROMINOS[cell.shape].color}
          />
        )),
      )}
    </StyledStage>
  );
};
