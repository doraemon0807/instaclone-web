import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "./components/auth/AuthLayout";
import Separator from "./components/auth/Separator";
import FormBox from "./components/auth/FormBox";
import BottomBox from "./components/auth/BottomBox";
import { Input } from "./components/shared/SharedStyle";
import InputButton from "./components/auth/InputButton";
import PageTitle from "./components/shared/PageTitle";
import { useForm } from "react-hook-form";

const Title = styled.h1`
  margin-bottom: 55px;
  font-weight: 600;
  font-size: 55px;
  font-family: "Dancing Script";
  color: ${(props) => props.theme.fontColor};
`;

const GithubLogin = styled.div`
  color: ${(props) => props.theme.accentDark};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0px;
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
  const { register, handleSubmit, watch } = useForm();
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <Title>Outstagram</Title>
        <form>
          <Input
            type="text"
            placeholder="Phone number, username, or email"
            {...register("username", { required: true })}
          />
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <InputButton type="submit" value="Log in" />
        </form>
        <Separator value="Or" />
        <GithubLogin>
          <FontAwesomeIcon size="2xl" icon={faGithubSquare} />
          <span>Log in with Github</span>
        </GithubLogin>
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
