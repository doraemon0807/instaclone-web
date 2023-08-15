import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  Photo,
  ToggleLikeMutation,
  ToggleLikeMutationVariables,
} from "../../../gql/graphql";
import { FatText } from "../shared/SharedStyle";
import Avatar from "../shared/Avatar";
import { graphql } from "../../../gql";
import { ApolloCache, gql, useMutation } from "@apollo/client";

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

interface IPhotoProps {
  id: number;
  user: {
    username: string;
    avatar?: string | null;
  };
  file: string;
  isLiked: boolean;
  likes: number;
}

const TOGGLE_LIKE_MUTATION = graphql(`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`);

function PhotoPost({ id, user, file, isLiked, likes }: IPhotoProps) {
  const updateToggleLike = (cache: ApolloCache<Photo>, data: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = data;

    console.log(data);

    if (ok) {
      const fragmentId = `Photo:${id}`;
      const fragment = gql`
        fragment BSName on Photo {
          isLiked
          likes
        }
      `;

      // read cache from fragment
      const result = cache.readFragment<any>({
        id: fragmentId,
        fragment,
      });
      // if isLiked and likes info is in result
      if ("isLiked" in result && "likes" in result) {
        const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
        // update cache by fragments
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            isLiked: !cacheIsLiked,
            likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
          },
        });
      }
    }
  };

  // mutation function to toggle likes
  const [toggleLikeMutation] = useMutation<
    ToggleLikeMutation,
    ToggleLikeMutationVariables
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar url={user.avatar} />
        <PhotoUser>
          <Username>{user.username}</Username>
          <Dot>•</Dot>
          <span>Date</span>
        </PhotoUser>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
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
      </PhotoData>
    </PhotoContainer>
  );
}

export default PhotoPost;
