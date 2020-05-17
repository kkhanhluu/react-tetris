export const blockShape = {
  // I: [[1, 1, 1, 1]],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  // J: [
  //   [1, 0, 0],
  //   [1, 1, 1],
  // ],
  // Z: [
  //   [1, 1, 0],
  //   [0, 1, 1],
  // ],
  // S: [
  //   [0, 1, 1],
  //   [1, 1, 0],
  // ],
  O: [
    [1, 1],
    [1, 1],
  ],
  // T: [
  //   [0, 1, 0],
  //   [1, 1, 1],
  // ],
};

export const origin = {
  I: [
    [-1, 1],
    [1, -1],
  ],
  L: [[0, 0]],
  J: [[0, 0]],
  Z: [[0, 0]],
  S: [[0, 0]],
  O: [[0, 0]],
  T: [
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, -1],
  ],
};

// export const blockTypes = ['I', 'L', 'J', 'Z', 'S', 'O', 'T'];
export const blockTypes = ['L', 'O'];
export const matrixWidth = 10;
export const matrixHeight = 20;
export const timeInterval = 50;
