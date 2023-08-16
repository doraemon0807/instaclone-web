import { useNavigate } from "react-router-dom";
// import { logUserOut } from "../apollo";
import { useQuery } from "@apollo/client";
import { styled } from "styled-components";
import { graphql } from "../gql";
import { SeeFeedQuery } from "../gql/graphql";
import PageTitle from "./components/shared/PageTitle";
import PhotoPost from "./components/feed/PhotoPost";

const FeedContainer = styled.div`
  margin-top: 10px;
`;

const FEED_QUERY = graphql(`
  query seeFeed {
    seeFeed {
      ok
      error
      photos {
        id
        file
        caption
        likes
        commentCount
        createdAt
        isMine
        isLiked
        user {
          id
          username
          avatar
        }
        comments {
          id
          payload
          isMine
          createdAt
          user {
            username
            avatar
          }
        }
      }
    }
  }
`);

function Home() {
  const navigate = useNavigate();

  const { data } = useQuery<SeeFeedQuery>(FEED_QUERY);

  return (
    <FeedContainer>
      <PageTitle title="Feed" />
      {data?.seeFeed?.photos?.map(
        (photo) => photo && <PhotoPost key={photo.id} {...photo} />
      )}
      {/* <button onClick={() => logUserOut(navigate)}>Logout Now</button> */}
    </FeedContainer>
  );
}
export default Home;
