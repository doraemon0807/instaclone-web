import { useReactiveVar } from "@apollo/client";
import { styled } from "styled-components";
import { isLoggedInVar } from "../../apollo";
import useUser from "../hooks/useUser";
import Avatar from "./shared/Avatar";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 770px;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: ${(props) => props.theme.bgColor};
  border-top: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontColor};
  z-index: 100;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Icons = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
`;

function NavBar() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const { data } = useUser();

  return (
    <Container>
      <Wrapper>
        <Icons>
          <span>Home</span>
          <span>Explore</span>
          <span>Reels</span>
          <span>Post</span>
          <span>Inbox</span>
          <Link to={`/profile/${data?.me.profile?.username}`}>
            {isLoggedIn ? (
              <Avatar url={data?.me?.profile?.avatar} size="sm" />
            ) : (
              <Avatar url="" />
            )}
          </Link>
        </Icons>
      </Wrapper>
    </Container>
  );
}

export default NavBar;
