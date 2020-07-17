import React from "react";
import { CSSTransition } from "react-transition-group";
import { Container, Slider } from "./styled";

export const SliderContainer = ({ display, direction, children, enterDelay, ...props }) => {
  return (
    <Container>
      <CSSTransition
        in={display}
        timeout={1000}
        className="slider-content"
        classNames="slider-content"
        {...props}
      >
        <Slider direction={direction} enterDelay={enterDelay}>{children}</Slider>
      </CSSTransition>
    </Container>
  );
};
