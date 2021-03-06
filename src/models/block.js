import { blockShape, origin } from '../constants';

class Block {
  constructor(option) {
    this.type = option.type;
    this.rotateIndex = option.rotateIndex || 0;
    this.shape = option.shape || blockShape[option.type];

    if (!option.x && !option.y) {
      switch (option.type) {
        case 'I':
          this.x = 3;
          this.y = 0;
          break;
        case 'L':
          this.x = 4;
          this.y = -1;
          break;
        case 'J':
          this.x = 4;
          this.y = -1;
          break;
        case 'Z':
          this.x = 4;
          this.y = -1;
          break;
        case 'S':
          this.x = 4;
          this.y = -1;
          break;
        case 'O':
          this.x = 4;
          this.y = -1;
          break;
        case 'T':
          this.x = 4;
          this.y = -1;
          break;
        default:
          break;
      }
    } else {
      this.x = option.x;
      this.y = option.y;
    }
  }

  rotate() {
    const shape = this.shape;
    let result = [];
    shape.forEach((subArray) =>
      subArray.forEach((cell, cellIndex) => {
        const index = cell.length - 1 - cellIndex;
        if (result[index] === undefined) {
          result[index] = [];
        }
        result[index].push(cell);
      })
    );

    const nextX = this.x + origin[this.type][this.rotateIndex][0];
    const nextY = this.y + origin[this.type][this.rotateIndex][1];

    const nextRotateIndex =
      this.rotateIndex + 1 >= origin[this.type].length
        ? 0
        : this.rotateIndex + 1;

    return new Block({
      type: this.type,
      rotateIndex: nextRotateIndex,
      x: nextX,
      y: nextY,
      shape: result,
    });
  }

  fall(distance = 1) {
    return new Block({
      type: this.type,
      rotateIndex: this.rotateIndex,
      x: this.x,
      y: this.y + distance,
      shape: this.shape,
    });
  }

  left() {
    return new Block({
      type: this.type,
      rotateIndex: this.rotateIndex,
      x: this.x - 1,
      y: this.y,
      shape: this.shape,
    });
  }

  right() {
    return new Block({
      type: this.type,
      rotateIndex: this.rotateIndex,
      x: this.x + 1,
      y: this.y,
      shape: this.shape,
    });
  }
}

export default Block;
