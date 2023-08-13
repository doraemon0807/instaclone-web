import { styled } from "styled-components";

const SButton = styled.input`
  margin: 15px 0px;
  padding: 8px 0px;
  background-color: ${(props) => props.theme.accent};
  text-align: center;
  color: white;
  font-weight: 500;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
`;

function Button(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <SButton {...props} />;
}

export default Button;
