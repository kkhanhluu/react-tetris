import { PieceUtil } from 'helpers';
import { Piece } from 'models/piece/piece';
import { TetrisState } from 'store';
import { GetState, SetState } from 'zustand';

const pieceUtil = new PieceUtil();

export interface PieceSlice {
  pieceUtil: PieceUtil;
  currentPiece: Piece | null;
  nextPiece: Piece;
  hold: Piece;
  setCurrentPiece: (newPiece: Piece | null) => void;
  setNextPiece: (newPiece: Piece) => void;
  setPieceUtil: (pieceUtil: PieceUtil) => void;
}

export function createPieceSlice(
  set: SetState<TetrisState>,
  _get: GetState<TetrisState>,
): PieceSlice {
  return {
    pieceUtil,
    currentPiece: null,
    nextPiece: pieceUtil.getRandomPiece(),
    hold: pieceUtil.getNonePiece(),
    setCurrentPiece: (newPiece: Piece | null) => {
      set({ currentPiece: newPiece });
    },
    setNextPiece: (newPiece: Piece) => {
      set({ nextPiece: newPiece });
    },
    setPieceUtil: (pieceUtil: PieceUtil) => {
      set({ pieceUtil });
    },
  };
}
