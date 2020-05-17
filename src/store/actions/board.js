import * as actionTypes from './actionTypes';

export const initBoard = () => {
  return {
    type: actionTypes.INIT_BOARD,
  };
};

export const blockFall = () => {
  return {
    type: actionTypes.BLOCK_FALL,
  };
};

export const setFallInterval = (fallInterval) => {
  return {
    type: actionTypes.SET_FALL_INTERVAL,
    interval: fallInterval,
  };
};

export const removeInterval = () => {
  return {
    type: actionTypes.REMOVE_INTERVAL,
  };
};
