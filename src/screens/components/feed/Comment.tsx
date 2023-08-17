import { styled } from "styled-components";
import { FatText } from "../shared/SharedStyle";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { graphql } from "../../../gql";
import { ApolloCache, DefaultContext, useMutation } from "@apollo/client";
import { DeleteCommentMutation } from "../../../gql/graphql";

const CommentContainer = styled.div`
  display: flex;
`;

const Caption = styled.span`
  margin-left: 6px;
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

interface ICommentProps {
  author?: string;
  payload?: string;
  id?: number;
  isMine?: boolean;
  photoId?: number;
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
      <FatText>{author}</FatText>
      <Caption>
        {payload?.split(" ").map((word, idx, arr) => (
          <CaptionWrapper key={idx}>
            {/#[\w]+/.test(word) ? (
              <Fragment>
                <Link to={`/hashtags/${word.replace("#", "")}`}>{word}</Link>
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
      {isMine ? <button onClick={onDeleteClick}>X</button> : null}
    </CommentContainer>
  );
}

export default CommentEntry;
