import { styled } from "styled-components";

const SFormError = styled.span`
  color: red;
  font-size: 12px;
`;

interface IProps {
  message?: string;
}

function FormError({ message }: IProps) {
  return message ? <SFormError>{message}</SFormError> : null;
}

export default FormError;
