import { Colors } from 'helpers/colors';
import { FunctionComponent } from 'react';
import { useStore } from 'store';
import styled from 'styled-components';

const Tile = styled.div`
  display: block;
  width: 20px;
  height: 20px;
  padding: 2px;
  border: 2px solid ${Colors.gray};
  margin: 0 2px 2px 0;
  float: left;

  &:after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background: ${Colors.gray};
    overflow: hidden;
  }

  &.filled {
    border-color: ${Colors.black};
    &:after {
      background: ${Colors.black};
    }
  }

  &.animated {
    border-color: ${Colors.brown};
    &:after {
      background: ${Colors.brown};
    }
  }
`;

const StyledBoard = styled.div`
  border: 2px solid ${Colors.black};
  padding: 3px 1px 1px 3px;
  width: 228px;
  overflow: auto;
`;

export const Board: FunctionComponent = () => {
  const store = useStore();
  console.log(store);
  return (
    <StyledBoard className="game-board">
      {store.matrix.map((tileRow, row) => (
        <div key={row}>
          {tileRow.map((tile, column) => (
            <Tile key={row * 10 + column} />
          ))}
        </div>
      ))}
    </StyledBoard>
  );
};
