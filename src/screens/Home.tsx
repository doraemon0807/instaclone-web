import { useNavigate } from "react-router-dom";
import { logUserOut } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { styled } from "styled-components";
import Avatar from "./components/shared/Avatar";
import { FatText } from "./components/shared/SharedStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";

const FeedContainer = styled.div`
  margin-top: 10px;
`;

const PhotoContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const PhotoUser = styled.div`
  display: flex;
  color: ${(props) => props.theme.grayColor};
`;

const Username = styled(FatText)`
  margin-left: 10px;
  color: ${(props) => props.theme.fontColor};
`;

const Dot = styled.span`
  margin: 0px 4px;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px 10px;
`;

const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  margin-right: 15px;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const FEED_QUERY = gql`
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
        user {
          id
          username
          avatar
        }
      }
    }
  }
`;

function Home() {
  const navigate = useNavigate();

  const { data } = useQuery(FEED_QUERY);

  return (
    <FeedContainer>
      {data?.seeFeed?.photos?.map((photo: any) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} />
            <PhotoUser>
              <Username>{photo.user.username}</Username>
              <Dot>•</Dot>
              <span>Date</span>
            </PhotoUser>
          </PhotoHeader>
          <PhotoFile src={photo.file} />
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon size="xl" icon={faHeart} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size="xl" icon={faMessage} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size="xl" icon={faPaperPlane} />
                </PhotoAction>
              </div>
              <div>
                <FontAwesomeIcon size="xl" icon={faBookmark} />
              </div>
            </PhotoActions>
            <Likes>
              {photo.likes === 1 ? "1 like" : `${photo.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
      {/* <button onClick={() => logUserOut(navigate)}>Logout Now</button> */}
    </FeedContainer>
  );
}
export default Home;
