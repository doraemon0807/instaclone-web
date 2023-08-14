import { useReactiveVar } from "@apollo/client";
import { darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, darkTheme, lightTheme } from "./styles";
import Router from "./Router";
import { HelmetProvider } from "react-helmet-async";

function Root() {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default Root;
