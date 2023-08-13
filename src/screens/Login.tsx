import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import routes from "../Routes";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 55px;
  font-weight: 600;
  font-size: 55px;
  font-family: "Dancing Script";
  color: ${(props) => props.theme.fontColor};
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 0px 25px 0px;
  margin-bottom: 10px;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 270px;
    width: 100%;
  }
`;

const InputText = styled.input`
  width: 100%;
  background-color: #fafafa;
  padding: 10px 8px;
  border: 1px solid ${(props) => props.theme.borderColor};
  font-size: 12px;
  box-sizing: border-box;
  margin: 3px 0px;
`;

const LoginButton = styled.input`
  margin: 15px 0px;
  padding: 8px 0px;
  background-color: ${(props) => props.theme.accent};
  text-align: center;
  color: white;
  font-weight: 500;
  border-radius: 10px;
  width: 100%;
`;

const Separator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 270px;
  margin-bottom: 30px;

  div {
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }

  span {
    display: block;
    padding: 0px 16px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
    color: #616161;
  }
`;

const FacebookLogin = styled.div`
  color: #385185;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  span {
    font-weight: 500;
    margin-left: 8px;
    font-size: 14px;
  }
`;

const ForgotPassword = styled.span`
  font-size: 12px;
  color: #00376b;
`;

const BottomBox = styled(WhiteBox)`
  padding: 20px 0px;
  text-align: center;
  font-size: 14px;
  span {
    margin-right: 5px;
  }
  a {
    font-weight: 600;
    color: ${(props) => props.theme.accent};
  }
`;

function Login() {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <Title>Outstagram</Title>
          <form>
            <InputText
              type="text"
              placeholder="Phone number, username, or email"
            />
            <InputText type="password" placeholder="Password" />
            <LoginButton type="submit" value="Log in" />
          </form>
          <Separator>
            <div></div>
            <span>Or</span>
            <div></div>
          </Separator>
          <FacebookLogin>
            <FontAwesomeIcon size="2xl" icon={faGithubSquare} />
            <span>Log in with Github</span>
          </FacebookLogin>
          <ForgotPassword>Forgot password?</ForgotPassword>
        </TopBox>
        <BottomBox>
          <span>Don't have an account?</span>
          <Link to={routes.signUp}>Sign up</Link>
        </BottomBox>
      </Wrapper>
    </Container>
  );
}
export default Login;
