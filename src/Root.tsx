import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";

function Root() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />}></Route>
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
