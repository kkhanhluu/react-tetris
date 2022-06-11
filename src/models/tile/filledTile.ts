import { Tile, TileValue } from './tile';

export class FilledTile extends Tile {
  constructor(isSolid: boolean) {
    super(TileValue.FILLED, isSolid);
  }
}
