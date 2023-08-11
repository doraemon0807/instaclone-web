import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, darkTheme, lightTheme } from "./styles";
import SignUp from "./screens/Signup";

function Root() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />}></Route>
          {!isLoggedIn ? (
            <Route path="/sign-up" element={<SignUp />}></Route>
          ) : null}
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Root;
