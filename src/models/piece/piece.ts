import { PieceRotation } from './pieceRotation';
import { PieceType } from './pieceType';
import { Shape, Shapes } from './shape';

export class Piece {
  public rotation = PieceRotation.Deg0;
  public type!: PieceType;
  public shape!: Shape;
  public next!: Shape;
  private shapes!: Shapes;

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
}
