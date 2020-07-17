import styled, { css } from "styled-components";

export const Banner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 60px;
  font-size: 20px;
  color: white;
  text-transform: uppercase;
  z-index: 10;
  ${(props) => {
    switch (props.variant) {
      case "accent":
        return css`
          color: black;
          background-color: #fae141;
        `;
      case "secondary":
        return css`
          color: white;
          background-color: #8b2fa5;
        `;
      default:
        return "";
    }
  }}
`;

export const AccentBanner = styled(Banner)`
  background-color: #fae141;
  color: black;
`;
