import styled, { css } from "styled-components";
import { slideDirection, slideIn } from "../../styling/Animations";

export const Container = styled.div`
  overflow: hidden;
  display: flex;
`;

export const Slider = styled.div`
  transform: ${(props) =>
    props.display ? slideDirection(props.direction) : `translateX(0)`};
  z-index: 10;
  display: flex;

  &.slider-content-enter {
    transform: ${(props) => slideDirection(props.direction)};
  }

  &.slider-content-enter-active {
    animation: ${(props) => slideIn(props.direction)} 500ms normal;
    animation-fill-mode: forwards;
    animation-delay: ${(props) => props.enterDelay}ms;
  }

  &.slider-content-exit {
    transform: ${(props) => slideDirection(props.direction)};
  }

  &.slider-content-exit-active {
    animation: ${(props) => slideIn(props.direction)} 500ms reverse;
    animation-fill-mode: forwards;
  }

  &.slider-content-exit-done {
    transform: ${(props) => slideDirection(props.direction)};
  }
`;
