import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "./components/auth/AuthLayout";
import Separator from "./components/auth/Separator";
import FormBox from "./components/auth/FormBox";
import BottomBox from "./components/auth/BottomBox";
import InputButton from "./components/auth/InputButton";
import PageTitle from "./components/shared/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "./components/auth/FormError";
import Input from "./components/auth/FormInput";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import { Notification } from "./components/shared/SharedStyle";

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

interface ILoginForm {
  username: string;
  password: string;
  result?: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onSubmit",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  // when mutation is completed
  const onCompleted = ({ login: { ok, error, token } }: any) => {
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    // if token exists, save token to localstorage
    if (token) {
      logUserIn(token);
    }
  };

  // mutation function to log in
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  // when form is submitted, run login mutation
  const onSubmitValid: SubmitHandler<ILoginForm> = () => {
    const { username, password } = getValues();
    if (loading) {
      return;
    }
    login({
      variables: {
        username,
        password,
      },
    });
  };

  // clear error
  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <Title>Outstagram</Title>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)} onFocus={clearLoginError}>
          <Input
            {...register("username", {
              required: "This field is required.",
              minLength: {
                message: "This value is too short.",
                value: 5,
              },
            })}
            type="text"
            placeholder="Username, or email"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "This field is required.",
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <FormError message={errors?.result?.message} />

          <InputButton
            type="submit"
            value={loading ? "Loading..." : "Log In"}
            disabled={!isValid || loading}
          />
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
