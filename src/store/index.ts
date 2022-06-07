import { MatrixUtil } from 'helpers/matrix';
import { Tile } from 'models/tile/tile';
import create from 'zustand';

interface TetrisState {
  matrix: Tile[][];
}
export const useStore = create<TetrisState>()((set) => ({
  matrix: MatrixUtil.getStartBoard(),
}));
