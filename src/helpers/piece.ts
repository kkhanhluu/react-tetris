import { PieceI } from 'models/piece/i';
import { PieceJ } from 'models/piece/j';
import { PieceL } from 'models/piece/l';
import { NonePiece } from 'models/piece/none';
import { PieceO } from 'models/piece/o';
import { Piece } from 'models/piece/piece';
import { PieceS } from 'models/piece/s';
import { PieceT } from 'models/piece/t';
import { PieceZ } from 'models/piece/z';

export const SPAWN_POSITION_X = 4;
export const SPAWN_POSITION_Y = -4;

export class PieceUtil {
  private availableBag: typeof Piece[] = [
    PieceI,
    PieceJ,
    PieceL,
    PieceO,
    PieceS,
    PieceT,
    PieceZ,
  ];
  private currentBag: typeof Piece[] = [];

  getRandomPiece(x = SPAWN_POSITION_X, y = SPAWN_POSITION_Y) {
    if (this.currentBag.length === 0) {
      this.generateNewBag();
    }
    const nextPiece = this.currentBag.pop();
    if (nextPiece) {
      return new nextPiece(x, y);
    }
    throw new Error('Error while generating random piece');
  }

  getNonePiece(x = SPAWN_POSITION_X, y = SPAWN_POSITION_Y): Piece {
    return new NonePiece(x, y);
  }

  generateNewBag() {
    this.currentBag = [...this.availableBag];
    this.shuffleArray(this.currentBag);
  }

  shuffleArray(array: typeof Piece[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}
