import { styled } from "styled-components";

const SInputButton = styled.input`
  margin: 15px 0px;
  padding: 8px 0px;
  background-color: ${(props) => props.theme.accentNormal};
  text-align: center;
  color: white;
  font-weight: 500;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

function InputButton(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <SInputButton {...props} />;
}

export default InputButton;
