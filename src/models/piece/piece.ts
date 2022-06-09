import { MatrixUtil } from 'helpers';
import { PieceRotation } from './pieceRotation';
import { PieceType } from './pieceType';
import { Shape, Shapes } from './shape';

export class Piece {
  public rotation = PieceRotation.Deg0;
  public type!: PieceType;
  public shape!: Shape;
  public next!: Shape;

  private shapes!: Shapes;
  private lastConfig: Partial<Piece> = {};

  constructor(public x: number, public y: number) {}

  protected setShapes(shapes: Shapes) {
    this.shapes = shapes;
    this.shape = shapes[this.rotation];
  }

  private newPiece(): Piece {
    const piece = new Piece(this.x, this.y);
    piece.rotation = this.rotation;
    piece.type = this.type;
    piece.next = this.next;
    piece.setShapes(this.shapes);
    return piece;
  }

  store(): Piece {
    this.lastConfig = {
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      shape: this.shape,
    };
    return this.newPiece();
  }

  revert(): Piece {
    if (Object.keys(this.lastConfig).length > 0) {
      Object.keys(this.lastConfig).forEach((key) => {
        (this as Record<string, unknown>)[key] = (
          this.lastConfig as Record<string, unknown>
        )[key];
      });
    }
    return this.newPiece();
  }

  get positionOnGrid(): number[] {
    const positions = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.shape[row][col]) {
          const position = (this.y + row) * MatrixUtil.WIDTH + this.x + col;
          if (position >= 0) {
            positions.push(position);
          }
        }
      }
    }
    return positions;
  }

  get bottomRow() {
    return this.y + 3;
  }

  get rightCol() {
    let col = 3;
    while (col >= 0) {
      for (let row = 0; row <= 3; row++) {
        if (this.shape[row][col]) {
          return this.x + col;
        }
      }
      col--;
    }
    return 0;
  }

  get leftCol() {
    return this.x;
  }

  moveRight(): Piece {
    this.x++;
    return this.newPiece();
  }

  moveLeft(): Piece {
    this.x--;
    return this.newPiece();
  }

  moveDown(step = 1): Piece {
    this.y += step;
    return this.newPiece();
  }
}
