import { randomTetromino } from 'helpers';
import { Shape } from 'helpers/types';
import { useState } from 'react';

interface PlayerState {
  pos: { x: number; y: number };
  tetromino: Shape;
  collided: boolean;
}

export function usePlayer(): [
  PlayerState,
  React.Dispatch<React.SetStateAction<PlayerState>>,
] {
  const [player, setPlayer] = useState<PlayerState>({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino(),
    collided: false,
  });

  return [player, setPlayer];
}
