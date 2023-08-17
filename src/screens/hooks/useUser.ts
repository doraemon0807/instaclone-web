import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../../apollo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MeQuery } from "../../gql/graphql";

const ME_QUERY = gql`
  query me {
    me {
      profile {
        id
        username
        avatar
      }
    }
  }
`;

// function to check if user's token is valid
function useUser() {
  const navigate = useNavigate();

  // check if token exists in local storage
  const hasToken = useReactiveVar(isLoggedInVar);
  // query function to fetch currently logged in user data
  const { data } = useQuery<MeQuery>(ME_QUERY, {
    skip: !hasToken, // skip if user doesn't have a token
  });

  useEffect(() => {
    if (data?.me.profile === null) {
      // if the token exist but no user was found because token is faulty
      logUserOut(navigate);
    }
  }, [data, navigate]);
  return { data };
}

export default useUser;
