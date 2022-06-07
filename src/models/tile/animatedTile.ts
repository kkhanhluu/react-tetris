import { Tile, TileValue } from './tile';

export class AnimatedTile extends Tile {
  constructor(isSolid = false) {
    super(TileValue.ANIMATED, isSolid);
  }
}
