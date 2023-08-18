import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { Photo } from "../../../gql/graphql";
import { FatText } from "../shared/SharedStyle";
import Avatar from "../shared/Avatar";
import { ApolloCache, DefaultContext, useMutation } from "@apollo/client";
import { graphql } from "../../../gql";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const PhotoContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 10px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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

  svg {
    cursor: pointer;
  }
`;

const PhotoAction = styled.div`
  margin-right: 15px;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const TOGGLE_LIKE_MUTATION = graphql(`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`);

interface IPhotoProps {
  id: number;
  file: string;
  caption?: string | null;
  likes: number;
  commentCount: number;
  createdAt: string;
  isMine: boolean;
  isLiked: boolean;
  user: {
    id: number;
    username: string;
    avatar?: string | null;
  };
  comments?: Array<{
    id: number;
    payload: string;
    isMine: boolean;
    createdAt: string;
    user: {
      id: number;
      username: string;
      avatar?: string | null;
    };
  } | null> | null;
}

function PhotoPost({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  comments,
  commentCount,
}: IPhotoProps) {
  // Function to update cache data
  const updateToggleLike = (
    cache: ApolloCache<Photo>,
    result: DefaultContext
  ) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      // modify cache fragment
      const fragmentId = `Photo:${id}`;
      cache.modify({
        id: fragmentId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  //mutation function to toggle likes
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    update: updateToggleLike,
  });

  //function to call when like button is clicked
  const onLikeClick = () => {
    if (loading) {
      return;
    }
    toggleLikeMutation({
      variables: {
        id,
      },
    });
  };

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/profile/${user?.username}`}>
          <Avatar url={user?.avatar} />
        </Link>
        <PhotoUser>
          <Link to={`/profile/${user?.username}`}>
            <Username>{user?.username}</Username>
          </Link>
          <Dot>•</Dot>
          <span>Date</span>
        </PhotoUser>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={onLikeClick}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                size="xl"
                icon={isLiked ? SolidHeart : faHeart}
              />
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
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user}
          caption={caption}
          comments={comments}
          commentCount={commentCount}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

export default PhotoPost;
