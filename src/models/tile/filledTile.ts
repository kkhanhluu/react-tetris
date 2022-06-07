import { Tile, TileValue } from './tile';

export class FilledTile extends Tile {
  constructor(isSolid = false) {
    super(TileValue.FILLED, isSolid);
  }
}
