import { useParams } from "react-router-dom";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";

interface ProfileParams {
  username: string;
}

const SEE_PROFILE_QUERY = graphql(`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ok
      error
      profile {
        ...UserFragment
        createdAt
        firstName
        lastName
        bio
        totalFollowing
        totalFollowers
        isFollowing
        isMe
        photos {
          ...PhotoFragment
        }
      }
    }
  }
`);

function Profile() {
  const { username } = useParams<Readonly<ProfileParams>>();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: username!,
    },
  });

  return <h1>Profile: {username}</h1>;
}

export default Profile;
