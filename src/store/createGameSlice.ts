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
  point: number;
  setPoint: (point: number) => void;
  initNumberOfLines: number;
  increaseInitNumberOfLines: () => void;
  decreaseInitNumberOfLines: () => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  isResetting: boolean;
  setIsResetting: (isResetting: boolean) => void;
}

export function createGameSlice(
  set: SetState<TetrisState>,
  _get: GetState<TetrisState>,
): GameSlice {
  return {
    setGameStatus: (status) => set({ status }),
    status: GameStatus.Loading,
    speed: 1,
    initSpeed: 1,
    setSpeed: (speed) => set({ speed }),
    isSoundOn: true,
    toggleSoundOn: () => set((state) => ({ isSoundOn: !state.isSoundOn })),
    numberOfClearedLines: 0,
    setNumberOfClearedLines: (lines) =>
      set(() => ({
        numberOfClearedLines: lines,
      })),
    point: 0,
    setPoint: (addedPoints) =>
      set((state) => ({ point: state.point + addedPoints })),
    initNumberOfLines: 0,
    increaseInitNumberOfLines: () =>
      set((state) => ({ initNumberOfLines: state.initNumberOfLines + 1 })),
    decreaseInitNumberOfLines: () =>
      set((state) => ({ initNumberOfLines: state.initNumberOfLines - 1 })),
    paused: false,
    setPaused: (paused) => set({ paused }),
    isResetting: true,
    setIsResetting: (isResetting) => set({ isResetting }),
  };
}
