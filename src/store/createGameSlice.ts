import { GameStatus } from 'models/gameStatus';
import { TetrisState } from 'store';
import { GetState, SetState } from 'zustand';

export interface GameSlice {
  status: GameStatus;
  setGameStatus: (status: GameStatus) => void;
}

export function createGameSlice(
  set: SetState<TetrisState>,
  _get: GetState<TetrisState>,
): GameSlice {
  return {
    setGameStatus: (status) => set({ status }),
    status: GameStatus.Loading,
  };
}
