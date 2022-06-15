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

export function spaceButtonClickHandler(store: TetrisState) {
  store.setKey({ isKeyDropActive: true });
  if (store.currentPiece) {
    drop(store);
    AudioService.fall(store.isSoundOn);
    return;
  }
  start(store);
  AudioService.start(store.isSoundOn);
}

export function arrowDownButtonClickHandler(store: TetrisState) {
  if (store.status === GameStatus.Started) {
    store.setKey({ isKeyDownActive: true });
    moveDown(store);
  } else if (store.status === GameStatus.Loading) {
    store.decreaseInitNumberOfLines();
  }
  AudioService.move(store.isSoundOn);
}

export function arrowLeftButtonClickHandler(store: TetrisState) {
  store.setKey({ isKeyLeftActive: true });
  moveLeft(store);
  AudioService.move(store.isSoundOn);
}

export function arrowRightButtonClickHandler(store: TetrisState) {
  store.setKey({ isKeyRightActive: true });
  moveRight(store);
  AudioService.move(store.isSoundOn);
}

export function arrowUpButtonClickHandler(store: TetrisState) {
  if (store.status === GameStatus.Started) {
    store.setKey({ isKeyUpActive: true });
    rotate(store);
    AudioService.rotate(store.isSoundOn);
  } else if (store.status === GameStatus.Loading) {
    store.increaseInitNumberOfLines();
  }
}

export function resetButtonClickHandler(store: TetrisState) {
  store.setKey({ isKeyResetActive: true });
  reset(store);
}

export function pauseButtonClickHandler(store: TetrisState) {
  store.setKey({ isKeyPauseActive: true });
  if (store.status !== GameStatus.Started) {
    resume(store);
  } else {
    pause(store);
  }
}

export function soundButtonClickHandler(store: TetrisState) {
  store.setKey({ isKeySoundActive: true });
  store.toggleSoundOn();
}

export function keyDownEventHandler(key: string, store: TetrisState) {
  switch (key) {
    case ' ':
      spaceButtonClickHandler(store);
      break;
    case 'ArrowDown':
      arrowDownButtonClickHandler(store);
      break;
    case 'ArrowLeft':
      arrowLeftButtonClickHandler(store);
      break;
    case 'ArrowRight':
      arrowRightButtonClickHandler(store);
      break;
    case 'ArrowUp':
      arrowUpButtonClickHandler(store);
      break;
    case 'r':
      resetButtonClickHandler(store);
      break;
    case 'p':
      pauseButtonClickHandler(store);
      break;
    case 's':
      soundButtonClickHandler(store);
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
