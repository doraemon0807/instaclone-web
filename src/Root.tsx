import { useReactiveVar } from "@apollo/client";
import { darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, darkTheme, lightTheme } from "./styles";
import Router from "./router";

function Root() {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default Root;
