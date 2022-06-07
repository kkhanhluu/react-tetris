import { EmptyTile } from 'models/tile/emptyTile';
import { Tile } from 'models/tile/tile';

export class MatrixUtil {
  static readonly WIDTH = 10;
  static readonly HEIGHT = 20;

  static getStartBoard(): Tile[][] {
    return new Array(this.HEIGHT)
      .fill(null)
      .map(() => new Array(this.WIDTH).fill(new EmptyTile()));
  }
}
