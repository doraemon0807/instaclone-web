import { styled } from "styled-components";
import { FatText } from "../shared/SharedStyle";
import { Fragment } from "react";
import { Link } from "react-router-dom";

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
}

function Comment({ author, payload }: ICommentProps) {
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
    </CommentContainer>
  );
}

export default Comment;
