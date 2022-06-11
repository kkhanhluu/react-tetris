import styled from 'styled-components';

export const StyledButton = styled.div`
  position: absolute;
  text-align: center;
  color: #111;
  position: absolute;
  white-space: nowrap;
  line-height: 1.6;
  cursor: pointer;

  span {
    &.absolute {
      position: absolute;
      top: 5px;
      left: 102px;
    }
  }

  i {
    display: block;
    position: relative;
    border: 1px solid #000;
    border-radius: 50%;
    &:before,
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      box-shadow: 0 5px 10px rgba(255, 255, 255, 0.8) inset;
    }

    &:after {
      box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.8) inset;
    }

    &.active {
      &:before {
        box-shadow: 0 -3px 6px rgba(255, 255, 255, 0.6) inset;
      }
      &:after {
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.6) inset;
      }
    }
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  }

  &.blue i {
    background: #5a65f1;
  }

  &.green i {
    background: #2dc421;
  }

  &.red i {
    background: #dd1a1a;
  }

  &.btn-lg {
    i {
      width: 160px;
      height: 160px;
    }
  }

  &.btn-sm {
    font-size: 16px;

    i {
      width: 52px;
      height: 52px;
      &:before,
      &:after {
        box-shadow: 0px 3px 6px rgba(255, 255, 255, 0.8) inset;
      }
      &:after {
        box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.8) inset;
      }
      &.active {
        &:before {
          box-shadow: 0px -1px 2px rgba(255, 255, 255, 0.6) inset;
        }
        &:after {
          box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.7) inset;
        }
      }
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    }
  }

  &.btn-md {
    em {
      display: block;
      width: 0;
      height: 0;
      border: 8px solid;
      border-color: transparent transparent #111;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -12px 0 0 -8px;
    }

    i {
      width: 100px;
      height: 100px;
    }
  }
`;
