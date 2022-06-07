import { Tile, TileValue } from './tile';

export class EmptyTile extends Tile {
  constructor() {
    super(TileValue.EMPTY, false);
  }
}
