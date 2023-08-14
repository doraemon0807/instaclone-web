import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { NavigateFunction } from "react-router-dom";
import routes from "./routes";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

// is user logged in? check localStorage and see if token exists
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

// is user using dark mode?
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

// log in: save token to localstorage and set isLoggedInVar to true
export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

// log out: delete token from localstorage and set isLoggedInVar to false
export const logUserOut = (navigate: NavigateFunction) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
  navigate(routes.home, { replace: true });
};

// enable darkmode
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

// disable darkmode
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

// apollo client

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// Run setContext function that sends stuffs to every request client makes
const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
