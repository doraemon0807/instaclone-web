import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import routes from "../Routes";
import AuthLayout from "./components/auth/AuthLayout";
import Button from "./components/auth/Button";
import Separator from "./components/auth/Separator";
import Input from "./components/auth/Input";
import FormBox from "./components/auth/FormBox";
import BottomBox from "./components/auth/BottomBox";

const Title = styled.h1`
  margin-bottom: 55px;
  font-weight: 600;
  font-size: 55px;
  font-family: "Dancing Script";
  color: ${(props) => props.theme.fontColor};
`;

const FacebookLogin = styled.div`
  color: #385185;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  cursor: pointer;
  span {
    font-weight: 500;
    margin-left: 8px;
    font-size: 14px;
  }
`;

const ForgotPassword = styled.span`
  font-size: 12px;
  color: #00376b;
  cursor: pointer;
`;

function Login() {
  return (
    <AuthLayout>
      <FormBox>
        <Title>Outstagram</Title>
        <form>
          <Input type="text" placeholder="Phone number, username, or email" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Log in" />
        </form>
        <Separator value="Or" />
        <FacebookLogin>
          <FontAwesomeIcon size="2xl" icon={faGithubSquare} />
          <span>Log in with Github</span>
        </FacebookLogin>
        <ForgotPassword>Forgot password?</ForgotPassword>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
}
export default Login;
