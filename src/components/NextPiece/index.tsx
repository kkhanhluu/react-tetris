import { Tile } from 'components/Tile';
import { FunctionComponent } from 'react';
import { useStore } from 'store';
import styled from 'styled-components';

const Row = styled.div`
  height: 22px;
  width: 88px;
  float: right;
`;

export const NextPiece: FunctionComponent = () => {
  const store = useStore();
  return (
    <>
      <p>Next</p>
      {store.nextPiece.next.map((row, index) => (
        <Row key={index}>
          {row.map((cell, i2) => (
            <Tile key={i2} isFilled={Boolean(cell)} />
          ))}
        </Row>
      ))}
    </>
  );
};
