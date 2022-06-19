import styled from 'styled-components';

export const SocialContainer = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: -300px;

  .qr {
    left: auto;
    top: 5%;
    text-align: left;
    cursor: pointer;
    margin: 1rem 0;

    .hint {
      margin-bottom: 10px;
      font-size: 14px;
      max-width: 300px;
      color: #cfd2d6;
      opacity: 0;
    }

    img {
      width: 60px;
      height: 60px;
      transition: transform 0.2s;
      transform-origin: 0 0;
      &:hover {
        transform: scale(4.5);
      }
    }
  }

  display: flex;
  flex-direction: column;

  .tweet-button {
    cursor: pointer;
    margin-top: 7px;
    margin-bottom: 10px;

    &.top {
      margin-top: 15px;
    }
  }
`;
