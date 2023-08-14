import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { NavigateFunction } from "react-router-dom";
import routes from "./routes";

const TOKEN = "token";

// is user logged in? check localStorage and see if token exists
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

// is user using dark mode?
export const darkModeVar = makeVar(false);

// log in: save token to localstorage and set isLoggedInVar to true
export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

// log out: delete token from localstorage and set isLoggedInVar to false
export const logUserOut = (navigate: NavigateFunction) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  navigate(routes.home, { replace: true });
};

// apollo client
export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
