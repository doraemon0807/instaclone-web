import { styled } from "styled-components";
import { IPostModeParams } from "../../Profile";
import { isNullableType } from "graphql";

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
`;

const PhotoItem = styled.img`
  width: 100%;
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
        photos.map((photo) => <PhotoItem key={photo?.id} src={photo?.file} />)
      ) : mode === "posts" ? (
        isMe ? (
          <>Post + Me</>
        ) : (
          <>Post + not me</>
        )
      ) : mode === "saved" ? (
        <>Saved + me</>
      ) : mode === "tagged" ? (
        isMe ? (
          <>Tagged + Me</>
        ) : (
          <>Tagged + not me</>
        )
      ) : null}
    </PhotoGrid>
  );
}

export default PhotoGallery;
