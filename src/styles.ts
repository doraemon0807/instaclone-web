import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  fontColor: "#2c2c2c",
  bgColor: "white",
  accent: "#4cb5f9",
  borderColor: "rgb(219,219,219)",
};

export const darkTheme: DefaultTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
};

export const GlobalStyle = createGlobalStyle`
    ${reset}
    input {
      all: unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
      background-color: ${(props) => props.theme.bgColor};
      font-size:14px;
      font-family: "Roboto";
      color: ${(props) => props.theme.fontColor}
    }
    a {
      text-decoration: none;
    }
`;