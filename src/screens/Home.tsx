import { useQuery } from "@apollo/client";
import { styled } from "styled-components";
import { graphql } from "../gql";
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
        ...PhotoFragment
        user {
          ...UserFragment
        }
        comments {
          ...CommentFragment
        }
      }
    }
  }
`);

function Home() {
  const { data } = useQuery(FEED_QUERY);

  return (
    <FeedContainer>
      <PageTitle title="Feed" />
      {data?.seeFeed?.photos?.map(
        (photo) => photo && <PhotoPost key={photo.id} {...photo} />
      )}
    </FeedContainer>
  );
}
export default Home;
