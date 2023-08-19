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
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "./components/shared/PageTitle";
import Input from "./components/auth/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "./components/auth/FormError";
import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { CreateAccountMutation } from "../gql/graphql";

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
  color: ${(props) => props.theme.grayNormal};
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
    color: ${(props) => props.theme.grayNormal};
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

interface ISignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  result?: string;
}

const CREATE_ACCOUNT_MUTATION = graphql(`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`);

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({
    mode: "onSubmit",
  });

  // when mutation is completed
  const onCompleted = ({
    createAccount: { ok, error },
  }: CreateAccountMutation) => {
    if (!ok) {
      return setError("result", {
        message: error || "",
      });
    }
    // if successful, navigate user to home
    const { username, password } = getValues();
    navigate(routes.home, {
      state: { message: "Account created. Please log in.", username, password },
    });
  };

  // mutation function to create account
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  // when form is submitted, run signup mutation
  const onSubmitValid: SubmitHandler<ISignUpForm> = () => {
    if (loading) {
      return;
    }
    const { firstName, lastName, username, email, password } = getValues();
    createAccount({
      variables: {
        firstName,
        lastName,
        username,
        email,
        password,
      },
    });
  };

  const clearSignUpError = () => {
    clearErrors("result");
  };

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
        <form onSubmit={handleSubmit(onSubmitValid)} onFocus={clearSignUpError}>
          <Input
            {...register("firstName", { required: "This field is required." })}
            type="text"
            placeholder="First Name"
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            {...register("lastName", { required: "This field is required." })}
            type="text"
            placeholder="Last Name"
          />
          <FormError message={errors?.lastName?.message} />
          <Input
            {...register("email", { required: "This field is required." })}
            type="text"
            placeholder="Email"
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("username", {
              required: "This field is required.",
              minLength: {
                message: "This value is too short.",
                value: 5,
              },
            })}
            type="text"
            placeholder="Username"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "This field is required." })}
            type="password"
            placeholder="Password"
          />
          <FormError message={errors?.password?.message} />
          <FormError message={errors?.result?.message} />
          <InputButton
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!isValid || loading}
          />
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
