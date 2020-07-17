import { keyframes } from "styled-components";

export const slideDirection = (direction) => {
  switch (direction) {
    case "right":
      return "translateX(100%)";
    default:
      return "translateX(-100%)";
  }
};

export const slideIn = (direction) => keyframes`
  0% {
    transform: ${slideDirection(direction)};
  }
  100% {
    transform: translateX(0%);
  }
`;

export const popOver = keyframes`
  0% {
    transform: translateY(0);
    clip-path: initial;;
  }

  50% {
    transform: translateY(-100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  100% {
    transform: translateY(0);
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
`;
