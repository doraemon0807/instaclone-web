import { styled } from "styled-components";
import { IPostModeParams } from "../../Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
`;

const PhotoContainer = styled.div<{ $bg?: string }>`
  width: 100%;
  aspect-ratio: 1;
  background-image: url(${(props) => props.$bg});
  background-size: cover;
  position: relative;
`;

const PhotoIcons = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  &:hover > * {
    opacity: 1;
  }
`;

const PhotoIcon = styled.div`
  transition: all 0.1s ease-in-out;
  color: ${(props) => props.theme.grayLight};
  opacity: 0;
  span {
    margin-left: 5px;
  }
`;

const PhotoEmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IPhotoGalleryProps {
  mode: IPostModeParams;
  isMe: boolean;
  photos: ({
    __typename?: "Photo" | undefined;
    id: number;
    file: string;
    likes: number;
    commentCount: number;
    isLiked: boolean;
    caption?: string | null | undefined;
    createdAt: string;
    isMine: boolean;
  } | null)[];
}

function PhotoGallery({ mode, isMe, photos }: IPhotoGalleryProps) {
  return (
    <PhotoGrid>
      {photos.length > 0 ? (
        photos.map((photo) => (
          <PhotoContainer key={photo?.id} $bg={photo?.file}>
            <PhotoIcons>
              <PhotoIcon>
                <FontAwesomeIcon icon={faHeart} />
                <span>{photo?.likes}</span>
              </PhotoIcon>
              <PhotoIcon>
                <FontAwesomeIcon icon={faMessage} />
                <span>{photo?.commentCount}</span>
              </PhotoIcon>
            </PhotoIcons>
          </PhotoContainer>
        ))
      ) : mode === "posts" ? (
        isMe ? (
          <PhotoEmptyBox>Post + Me</PhotoEmptyBox>
        ) : (
          <PhotoEmptyBox>Post + not me</PhotoEmptyBox>
        )
      ) : mode === "saved" ? (
        <PhotoEmptyBox>Saved + me</PhotoEmptyBox>
      ) : mode === "tagged" ? (
        isMe ? (
          <PhotoEmptyBox>Tagged + Me</PhotoEmptyBox>
        ) : (
          <PhotoEmptyBox>Tagged + not me</PhotoEmptyBox>
        )
      ) : null}
    </PhotoGrid>
  );
}

export default PhotoGallery;
