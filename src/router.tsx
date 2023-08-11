import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/Signup";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";

function Router() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />}></Route>
        {!isLoggedIn ? (
          <Route path="/sign-up" element={<SignUp />}></Route>
        ) : null}
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
