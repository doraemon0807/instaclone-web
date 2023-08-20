import { useReactiveVar } from "@apollo/client";
import { styled } from "styled-components";
import { isLoggedInVar } from "../../apollo";
import { Link } from "react-router-dom";
import routes from "../../routes";

const Container = styled.div`
  max-width: 770px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontColor};
  z-index: 100;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 20px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -1px;
  font-family: "Dancing Script";
  color: ${(props) => props.theme.fontColor};
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accentNormal};
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Container>
      <Wrapper>
        <div>
          <Link to={routes.home}>
            <Title>Outstagram</Title>
          </Link>
        </div>
        {isLoggedIn ? (
          <>
            <div>
              <span>Search</span>
            </div>
            <div>
              <span>Notif</span>
            </div>
          </>
        ) : (
          <Link to={routes.home}>
            <Button>Log In</Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
}

export default Header;
