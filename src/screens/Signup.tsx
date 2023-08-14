import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "./components/auth/AuthLayout";
import Separator from "./components/auth/Separator";
import FormBox from "./components/auth/FormBox";
import BottomBox from "./components/auth/BottomBox";
import InputButton from "./components/auth/InputButton";
import TextButton from "./components/shared/TextButton";
import { Link } from "react-router-dom";
import PageTitle from "./components/shared/PageTitle";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 270px;
  margin-bottom: 18px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 55px;
  font-family: "Dancing Script";
  color: ${(props) => props.theme.fontColor};
`;

const Subtitle = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.grayColor};
  font-size: 18px;
  line-height: 24px;
  text-align: center;
`;

const GithubLogin = styled.div`
  margin: 5px 0px;
  width: 100%;
`;

const ToC = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 12px;
    color: ${(props) => props.theme.grayColor};
    text-align: center;
    line-height: 16px;
    letter-spacing: 0.2px;
    &:first-child {
      margin-bottom: 10px;
    }
  }
  a {
    color: ${(props) => props.theme.accentDark};
  }
`;

function SignUp() {
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <Title>Outstagram</Title>
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
          <GithubLogin>
            <TextButton>
              <FontAwesomeIcon
                size="2xl"
                icon={faGithubSquare}
                style={{ marginRight: "8px" }}
              />
              <span>Log in with Github</span>
            </TextButton>
          </GithubLogin>
          <Separator value="OR" />
        </HeaderContainer>
        <form>
          {/* <Input type="text" placeholder="Mobile Number or Email" />
          <Input type="text" placeholder="Full Name" />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" /> */}
          <InputButton type="submit" value="Sign up" />
        </form>
        <ToC>
          <span>
            People who use our service may have uploaded your contact
            information to Instagram. <Link to="#">Learn More</Link>
          </span>
          <span>
            By signing up, you agree to our <Link to="#">Terms</Link> ,{" "}
            <Link to="#">Privacy Policy</Link> and{" "}
            <Link to="#">Cookies Policy</Link>.
          </span>
        </ToC>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}
export default SignUp;
