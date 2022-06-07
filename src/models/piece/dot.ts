import { Piece } from './piece';
import { PieceRotation } from './pieceRotation';
import { PieceType } from './pieceType';
import { Shapes } from './shape';

const SHAPES_DOT: Shapes = [];
SHAPES_DOT[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
];

export class PieceDot extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceType.Dot;
    this.next = [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
    ];
    this.setShapes(SHAPES_DOT);
  }
}
