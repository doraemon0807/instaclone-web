import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  fontColor: "#2c2c2c",
  bgColor: "#fcfcfc",
  accentLight: "#4cb5f9",
  accentNormal: "#0095f6",
  accentDark: "#00376b",
  borderColor: "rgb(219,219,219)",
  grayColor: "#737373",
};

export const darkTheme: DefaultTheme = {
  fontColor: "#fcfcfc",
  bgColor: "#2c2c2c",
  accentLight: "#00376b",
  accentNormal: "#0095f6",
  accentDark: "#4cb5f9",
  borderColor: "rgb(219,219,219)",
  grayColor: "#737373",
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
      color: inherit;
      text-decoration: none;
    }
`;
