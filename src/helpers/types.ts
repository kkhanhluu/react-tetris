export enum CellStatus {
  CLEAR,
  COLLIDED,
}

export enum Shape {
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z',
  EMPTY = 'EMPTY',
}

export type CellObject = {
  shape: Shape;
  status: CellStatus;
};
