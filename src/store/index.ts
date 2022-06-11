import create from 'zustand';
import { createGameSlice, GameSlice } from './createGameSlice';
import { createKeyboardSlice, KeyboardSlice } from './createKeyboardSlice';
import { createMatrixSlice, MatrixSlice } from './createMatrixSlice';
import { createPieceSlice, PieceSlice } from './createPieceSlice';

export type TetrisState = MatrixSlice & PieceSlice & GameSlice & KeyboardSlice;

export const useStore = create<TetrisState>()((set, get) => ({
  ...createMatrixSlice(set, get),
  ...createPieceSlice(set, get),
  ...createGameSlice(set, get),
  ...createKeyboardSlice(set, get),
}));
