import { Piece } from './piece';
import { PieceRotation } from './pieceRotation';
import { PieceType } from './pieceType';
import { Shapes } from './shape';

const SHAPES_Z: Shapes = [];
SHAPES_Z[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0],
];

SHAPES_Z[PieceRotation.Deg90] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
];

export class PieceZ extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceType.Z;
    this.next = [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
    ];
    this.setShapes(SHAPES_Z);
  }
}
