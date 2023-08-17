import { styled } from "styled-components";
import CommentEntry from "./Comment";
import { SubmitHandler, useForm } from "react-hook-form";
import { graphql } from "../../../gql";
import { ApolloCache, DefaultContext, gql, useMutation } from "@apollo/client";
import { Comment, CreateCommentMutation } from "../../../gql/graphql";
import useUser from "../../hooks/useUser";

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
  photoId: number;
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

interface ICommentForm {
  payload: string;
  results?: string;
}

interface ICommentForm {
  payload: string;
  results?: string;
}

interface ICreateCommentUpdateProps {
  data?: CreateCommentMutation | null;
}

const CREATE_COMMENT_MUTATION = graphql(`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`);

function Comments({
  photoId,
  author,
  caption,
  commentCount,
  comments,
}: ICommentProps) {
  const { data: userData } = useUser();

  const { register, handleSubmit, setValue, getValues } =
    useForm<ICommentForm>();

  // Function to update cache data
  const createCommentUpdate = (
    cache: ApolloCache<Comment>,
    result: ICreateCommentUpdateProps
  ) => {
    if (!result.data) {
      return;
    }

    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData?.me) {
      // get payload from the form and empty the input
      const { payload } = getValues();
      setValue("payload", "");

      // create new fake comment object
      const newFakeComment = {
        __typename: "Comment",
        createdAt: Date.now(),
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me.profile,
        },
      };

      //write fragment to the cache
      //this returns a reference to the new fake comment
      const newCacheComment = cache.writeFragment({
        data: newFakeComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            payload
            isMine
            createdAt
            user {
              username
              avatar
            }
          }
        `,
      });

      // modify cache fragment inside photo
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            //return prev comments + link reference to new fake comment
            return [...prev, newCacheComment];
          },
          commentCount(prev) {
            return prev + 1;
          },
        },
      });
    }
  };

  // mutation function to create new comment
  const [createCommentMutation, { loading }] =
    useMutation<CreateCommentMutation>(CREATE_COMMENT_MUTATION, {
      update: createCommentUpdate,
    });

  // when form is submitted, run createComment mutation
  const onSubmitValid: SubmitHandler<ICommentForm> = (data) => {
    if (loading) {
      return;
    }
    const { payload } = data;
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };

  return (
    <CommentsContainer>
      <CommentEntry author={author} payload={caption || ""} />
      <CommentCount>
        {commentCount === 1 ? "1 comment" : `${commentCount} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <CommentEntry
          key={comment?.id}
          id={comment?.id}
          author={comment?.user?.username}
          payload={comment?.payload}
          isMine={comment?.isMine}
          photoId={photoId}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <input
            {...register("payload", {
              required: "This field is required.",
            })}
            type="text"
            placeholder="Write your comment..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
}

export default Comments;
