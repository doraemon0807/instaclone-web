import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/Signup";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import routes from "./routes";
import Layout from "./screens/components/Layout";
import Profile from "./screens/Profile";

function Router() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.home}
          element={
            isLoggedIn ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route path={`/profile/:username`} element={<Profile />}></Route>
        {!isLoggedIn ? (
          <Route path={routes.signUp} element={<SignUp />}></Route>
        ) : null}
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
