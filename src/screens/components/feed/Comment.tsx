import { css, styled } from "styled-components";
import { FatText } from "../shared/SharedStyle";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { graphql } from "../../../gql";
import { ApolloCache, useMutation } from "@apollo/client";
import { DeleteCommentMutation } from "../../../gql/graphql";
import Avatar from "../shared/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0px;
  position: relative;
  margin-top: 6px;
`;

const CommentWrapper = styled.div`
  display: flex;
`;

const CommentText = styled.div`
  display: inline;
  box-sizing: border-box;
  align-self: center;
  margin-left: 6px;
`;

const Author = styled(FatText)``;

const Caption = styled.span`
  margin-left: 6px;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 16px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accentNormal};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CaptionWrapper = styled.span``;

const CommentDelete = styled.div`
  place-self: center;
  color: ${(props) => props.theme.grayColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.fontColor};
  }
`;

interface ICommentProps {
  author?: {
    id: number;
    username: string;
    avatar?: string | null;
  };
  payload?: string;
  id?: number;
  isMine?: boolean;
  photoId?: number;
  caption?: boolean;
}

interface IDeleteCommentUpdateProps {
  data?: DeleteCommentMutation | null;
}

const DELETE_COMMENT_MUTATION = graphql(`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`);

function CommentEntry({ author, payload, id, isMine, photoId }: ICommentProps) {
  const deleteCommentUpdate = (
    cache: ApolloCache<Comment>,
    result: IDeleteCommentUpdateProps
  ) => {
    if (!result.data) {
      return;
    }

    const {
      data: {
        deleteComment: { ok },
      },
    } = result;

    if (ok) {
      // delete object with id from cache
      cache.evict({ id: `Comment:${id}` });

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentCount(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  // mutation function to delete comment
  const [deleteCommentMutation] = useMutation<DeleteCommentMutation>(
    DELETE_COMMENT_MUTATION,
    {
      variables: {
        id,
      },
      update: deleteCommentUpdate,
    }
  );

  // function to delete comment when button is clicked
  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <CommentWrapper>
        <Avatar url={author?.avatar} size="small" />
        <CommentText>
          <Author>{author?.username}</Author>
          <Caption>
            {payload?.split(" ").map((word, idx, arr) => (
              <CaptionWrapper key={idx}>
                {/#[\w]+/.test(word) ? (
                  <Fragment>
                    <Link to={`/hashtags/${word.replace("#", "")}`}>
                      {word}
                    </Link>
                  </Fragment>
                ) : /@[\w]+/.test(word) ? (
                  <Fragment>
                    <Link to={`/user/${word.replace("@", "")}`}>{word}</Link>
                  </Fragment>
                ) : (
                  <Fragment>{word}</Fragment>
                )}
                {idx !== arr.length && " "}
              </CaptionWrapper>
            ))}
          </Caption>
        </CommentText>
      </CommentWrapper>
      {isMine ? (
        <CommentDelete onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrashCan} />
        </CommentDelete>
      ) : null}
    </CommentContainer>
  );
}

export default CommentEntry;
