import { Speed } from 'models/speed';
import { EmptyTile } from 'models/tile/emptyTile';
import { FilledTile } from 'models/tile/filledTile';
import { Tile } from 'models/tile/tile';

export class MatrixUtil {
  static readonly WIDTH = 10;
  static readonly HEIGHT = 20;
  static SPEED_DELAY = [560, 480, 360, 256, 192, 128];
  static POINTS = [100, 300, 700, 1500];

  static getStartBoard(startLines = 0): Tile[] {
    if (startLines === 0) {
      return new Array(this.WIDTH * this.HEIGHT).fill(new EmptyTile());
    }
    const startMatrix: Tile[] = [];

    for (let i = 0; i < startLines; i++) {
      if (i <= 2) {
        // 0-3
        startMatrix.push(...this.getRandomFilledRow(5, 8));
      } else if (i <= 6) {
        // 4-6
        startMatrix.push(...this.getRandomFilledRow(4, 9));
      } else {
        // 7-9
        startMatrix.push(...this.getRandomFilledRow(3, 9));
      }
    }

    for (let i = 0, len = 20 - startLines; i < len; i++) {
      startMatrix.unshift(...this.EmptyRow);
    }
    return startMatrix;
  }

  static getRandomFilledRow(min: number, max: number): Tile[] {
    const count = parseInt(`${(max - min + 1) * Math.random() + min}`, 10);
    const line: Tile[] = new Array(count).fill(new FilledTile(true));

    for (let i = 0, len = 10 - count; i < len; i++) {
      const index = parseInt(`${(line.length + 1) * Math.random()}`, 10);
      line.splice(index, 0, new EmptyTile());
    }

    return line;
  }

  static get EmptyRow(): Tile[] {
    return new Array(this.WIDTH).fill(new EmptyTile());
  }

  static get FullRow(): Tile[] {
    return new Array(this.WIDTH).fill(new FilledTile(true));
  }

  static getSpeedDelay(speed: Speed) {
    return this.SPEED_DELAY[speed - 1] ?? this.SPEED_DELAY[0];
  }

  static getFullRowsOfBoard(board: Tile[]) {
    const fullRows: number[] = [];
    for (let rowIndex = MatrixUtil.HEIGHT - 1; rowIndex >= 0; rowIndex--) {
      const row = board.slice(
        rowIndex * MatrixUtil.WIDTH,
        (rowIndex + 1) * MatrixUtil.WIDTH,
      );
      const isRowFullySolid = row.every((cell) => cell.isSolid);
      if (isRowFullySolid) {
        fullRows.push(rowIndex);
      }
    }
    return fullRows;
  }
}
