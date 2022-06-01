import { randomTetromino } from 'helpers';
import { STAGE_WIDTH } from 'helpers/constants';
import { Shape } from 'helpers/types';
import { useCallback, useState } from 'react';

export interface PlayerState {
  pos: { x: number; y: number };
  tetromino: Shape;
  collided: boolean;
}

export function usePlayer(): [
  PlayerState,
  (args: { x: number; y: number; collided?: boolean }) => void,
  () => void,
] {
  const [player, setPlayer] = useState<PlayerState>({
    pos: { x: 0, y: 0 },
    tetromino: Shape.EMPTY,
    collided: false,
  });

  function updatePlayerPos({
    x,
    y,
    collided,
  }: {
    x: number;
    y: number;
    collided?: boolean;
  }) {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided: collided ?? prev.collided,
    }));
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino(),
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
}
