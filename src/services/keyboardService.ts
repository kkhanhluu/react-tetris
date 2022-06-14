import { GameStatus } from 'models/gameStatus';
import { TetrisState } from 'store';
import {
  drop,
  moveDown,
  moveLeft,
  moveRight,
  pause,
  reset,
  resume,
  rotate,
  start,
} from './tetrisService';

export function keyDownEventHandler(key: string, store: TetrisState) {
  switch (key) {
    case ' ':
      store.setKey({ isKeyDropActive: true });
      if (store.currentPiece) {
        drop(store);
        return;
      }
      start(store);
      break;
    case 'ArrowDown':
      if (store.status === GameStatus.Started) {
        store.setKey({ isKeyDownActive: true });
        moveDown(store);
      } else if (store.status === GameStatus.Loading) {
        store.decreaseInitNumberOfLines();
      }
      break;
    case 'ArrowLeft':
      store.setKey({ isKeyLeftActive: true });
      moveLeft(store);
      break;
    case 'ArrowRight':
      store.setKey({ isKeyRightActive: true });
      moveRight(store);
      break;
    case 'ArrowUp':
      if (store.status === GameStatus.Started) {
        store.setKey({ isKeyUpActive: true });
        rotate(store);
      } else if (store.status === GameStatus.Loading) {
        store.increaseInitNumberOfLines();
      }
      break;
    case 'r':
      store.setKey({ isKeyResetActive: true });
      reset(store);
      break;
    case 'p':
      store.setKey({ isKeyPauseActive: true });
      if (store.status !== GameStatus.Started) {
        resume(store);
      } else {
        pause(store);
      }
      break;
    case 's':
      store.setKey({ isKeySoundActive: true });
      store.toggleSoundOn();
      break;
    default:
      break;
  }
}

export function keyUpEventHandler(key: string, store: TetrisState) {
  switch (key) {
    case ' ':
      store.setKey({ isKeyDropActive: false });
      break;
    case 'ArrowDown':
      store.setKey({ isKeyDownActive: false });
      break;
    case 'ArrowLeft':
      store.setKey({ isKeyLeftActive: false });
      break;
    case 'ArrowRight':
      store.setKey({ isKeyRightActive: false });
      break;
    case 'ArrowUp':
      store.setKey({ isKeyUpActive: false });
      break;
    case 'r':
      store.setKey({ isKeyResetActive: false });
      break;
    case 'p':
      store.setKey({ isKeyPauseActive: false });
      break;
    case 's':
      store.setKey({ isKeySoundActive: false });
      break;
    default:
      break;
  }
}
