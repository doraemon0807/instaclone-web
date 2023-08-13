import { styled } from "styled-components";

const SInput = styled.input`
  width: 100%;
  background-color: #fafafa;
  padding: 10px 8px;
  border: 1px solid ${(props) => props.theme.borderColor};
  font-size: 12px;
  box-sizing: border-box;
  margin: 3px 0px;
`;

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <SInput {...props} />;
}

export default Input;
