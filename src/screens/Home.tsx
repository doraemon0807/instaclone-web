import { useNavigate } from "react-router-dom";
// import { logUserOut } from "../apollo";
import { useQuery } from "@apollo/client";
import { styled } from "styled-components";
import { graphql } from "../gql";
import { SeeFeedQuery } from "../gql/graphql";
import PhotoPost from "./components/feed/PhotoPost";
import PageTitle from "./components/shared/PageTitle";

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
        comments
        createdAt
        isMine
        isLiked
        user {
          id
          username
          avatar
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
