import { GameStatus } from 'models/gameStatus';
import { TetrisState } from 'store';
import { AudioService } from './audioService';
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
        AudioService.fall(store.isSoundOn);
        return;
      }
      start(store);
      AudioService.start(store.isSoundOn);
      break;
    case 'ArrowDown':
      if (store.status === GameStatus.Started) {
        store.setKey({ isKeyDownActive: true });
        moveDown(store);
      } else if (store.status === GameStatus.Loading) {
        store.decreaseInitNumberOfLines();
      }
      AudioService.move(store.isSoundOn);
      break;
    case 'ArrowLeft':
      store.setKey({ isKeyLeftActive: true });
      moveLeft(store);
      AudioService.move(store.isSoundOn);
      break;
    case 'ArrowRight':
      store.setKey({ isKeyRightActive: true });
      moveRight(store);
      AudioService.move(store.isSoundOn);
      break;
    case 'ArrowUp':
      if (store.status === GameStatus.Started) {
        store.setKey({ isKeyUpActive: true });
        rotate(store);
        AudioService.rotate(store.isSoundOn);
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
