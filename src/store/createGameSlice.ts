import { GameStatus } from 'models/gameStatus';
import { Speed } from 'models/speed';
import { TetrisState } from 'store';
import { GetState, SetState } from 'zustand';

export interface GameSlice {
  status: GameStatus;
  setGameStatus: (status: GameStatus) => void;
  speed: Speed;
  initSpeed: Speed;
  setSpeed: (speed: Speed) => void;
  isSoundOn: boolean;
  toggleSoundOn: () => void;
  numberOfClearedLines: number;
  setNumberOfClearedLines: (lines: number) => void;
}

export function createGameSlice(
  set: SetState<TetrisState>,
  _get: GetState<TetrisState>,
): GameSlice {
  return {
    setGameStatus: (status) => set({ status }),
    status: GameStatus.Loading,
    speed: 0,
    initSpeed: 1,
    setSpeed: (speed) => set({ speed }),
    isSoundOn: true,
    toggleSoundOn: () => set((state) => ({ isSoundOn: !state.isSoundOn })),
    numberOfClearedLines: 0,
    setNumberOfClearedLines: (lines) =>
      set((state) => ({
        numberOfClearedLines: state.numberOfClearedLines + lines,
      })),
  };
}
