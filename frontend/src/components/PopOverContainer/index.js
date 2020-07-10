import React from "react";
import { CSSTransition } from "react-transition-group";
import { PopOverElement, Container } from "./styled";

export const PopOverContainer = (props) => (
  <Container>
    <CSSTransition
      in={props.display}
      className="pop-over"
      classNames="pop-over"
      timeout={1000}
    >
      <PopOverElement>{props.children}</PopOverElement>
    </CSSTransition>
  </Container>
);
