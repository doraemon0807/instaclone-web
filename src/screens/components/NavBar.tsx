import { useReactiveVar } from "@apollo/client";
import { styled } from "styled-components";
import { isLoggedInVar } from "../../apollo";
import useUser from "../hooks/useUser";
import Avatar from "./shared/Avatar";

const Container = styled.div`
  max-width: 770px;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: ${(props) => props.theme.bgColor};
  border-top: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontColor};
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
          {isLoggedIn ? (
            <Avatar url={data?.me?.profile?.avatar} size="small" />
          ) : (
            <Avatar url="" />
          )}
        </Icons>
      </Wrapper>
    </Container>
  );
}

export default NavBar;
