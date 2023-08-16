import { styled } from "styled-components";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 14px;
  margin: 10px 0;
  display: block;
  font-weight: 500;
`;

interface ICommentProps {
  author: string;
  caption?: string | null;
  comments?: Array<{
    id: number;
    payload: string;
    isMine: boolean;
    createdAt: string;
    user: {
      username: string;
      avatar?: string | null;
    };
  } | null> | null;
  commentCount: number;
}

function Comments({ author, caption, commentCount, comments }: ICommentProps) {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption || ""} />
      <CommentCount>
        {commentCount === 1 ? "1 comment" : `${commentCount} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          author={comment?.user?.username}
          payload={comment?.payload}
        />
      ))}
    </CommentsContainer>
  );
}

export default Comments;
