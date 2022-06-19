import styled from 'styled-components';

export const StyledLink = styled.a`
  background-color: #eee;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, #fcfcfc),
    to(#eee)
  );
  background-image: linear-gradient(to bottom, #fcfcfc 0, #eee 100%);
  background-repeat: no-repeat;
  border: 1px solid #d5d5d5;
  padding: 3px 10px 3px 8px;
  font-size: 16px;
  line-height: 22px;
  border-radius: 4px;
  font-weight: 700;
  color: #333;
  display: flex;
  width: fit-content;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    background-color: #ddd;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0, #eee),
      to(#ddd)
    );
    background-image: linear-gradient(to bottom, #eee 0, #ddd 100%);
    border-color: #ccc;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
`;
