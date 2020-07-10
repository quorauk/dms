import styled from "styled-components";
import { popOver } from "../../styling/Animations";

export const Container = styled.div`
  overflow: visible;
  display: flex;
`;

export const PopOverElement = styled.div`
  display: inline-flex;
  z-index: 9;

  &.pop-over-enter {
    clip-path: initial;
  }

  &.pop-over-enter-active {
    animation: ${popOver} 500ms reverse;
    animation-fill-mode: forwards;
  }

  &.pop-over-exit-active {
    animation: ${popOver} 500ms normal;
    animation-fill-mode: forwards;
    animation-delay: 500ms;
  }

  &.pop-over-exit-done {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
`;
