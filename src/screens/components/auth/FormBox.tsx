import { styled } from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
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

interface IProps {
  children: React.ReactNode;
}

function FormBox({ children }: IProps) {
  return <Container>{children}</Container>;
}

export default FormBox;
