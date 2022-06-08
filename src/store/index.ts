import { PieceUtil } from 'helpers';
import { MatrixUtil } from 'helpers/matrix';
import { Piece } from 'models/piece/piece';
import { Tile } from 'models/tile/tile';
import create from 'zustand';

interface TetrisState {
  matrix: Tile[][];
  currentPiece: Piece | null;
  nextPiece: Piece;
}

const pieceUtil = new PieceUtil();

export const useStore = create<TetrisState>()((set) => ({
  matrix: MatrixUtil.getStartBoard(),
  currentPiece: null,
  nextPiece: pieceUtil.getRandomPiece(),
  hold: pieceUtil.getNonePiece(),
}));
