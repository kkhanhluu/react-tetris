import { Colors } from 'helpers';
import styled from 'styled-components';

export const Container = styled.div`
  width: 640px;
  padding-top: 40px;
  box-shadow: 0 0 10px ${Colors.white} inset;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -480px 0 0 -320px;
  background: ${Colors.yellow};
`;

export const Rect = styled.div`
  width: 480px;
  padding: 45px 0 35px;
  border: ${Colors.black} solid;
  border-width: 0 10px 10px;
  margin: 0 auto;
  position: relative;
  &.drop {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
`;

export const ScreenContainer = styled.div`
  width: 390px;
  height: 478px;
  border: solid 5px;
  border-color: #987f0f #fae36c #fae36c #987f0f;
  margin: 0 auto;
  position: relative;
`;

export const Panel = styled.div`
  width: 380px;
  height: 468px;
  margin: 0 auto;
  background: #9ead86;
  padding: 8px;
  border: 2px solid #494536;
`;

export const StateContainer = styled.div`
  width: 108px;
  position: absolute;
  top: 0;
  right: 15px;
  p {
    line-height: 47px;
    height: 57px;
    padding: 10px 0 0;
    white-space: nowrap;
    clear: both;
  }
  .bottom {
    position: absolute;
    width: 114px;
    top: 426px;
    left: 0;
  }
`;
