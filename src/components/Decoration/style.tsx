import styled from 'styled-components';

export const StyledH1 = styled.h1`
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: normal;
  top: -12px;
  left: 0;
  margin: 0;
  padding: 0;
  font-size: 30px;
`;

export const TopBorder = styled.div`
  position: absolute;
  height: 10px;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: hidden;

  & span {
    display: inline-block;
    width: 10px;
    height: 17px;
    overflow: hidden;
    background: #000;
  }
`;

export const View = styled.div`
  position: absolute;
  right: -70px;
  top: 20px;
  width: 44px;

  &.l {
    right: auto;
    left: -70px;
  }
`;

export const StyledEM = styled.em`
  display: block;
  width: 22px;
  height: 22px;
  overflow: hidden;
  float: left;
`;

export const StyledP = styled.p`
  height: 22px;
  clear: both;
`;

export const StyledSpanL = styled.span`
  /* right: auto;
  left: -70px; */
`;
