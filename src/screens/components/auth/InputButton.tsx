import { styled } from "styled-components";
import { Button } from "../shared/SharedStyle";

const SInputButton = styled(Button).attrs({
  as: "input",
})`
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  margin: 15px 0px;
`;

function InputButton(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <SInputButton $accent {...props} />;
}

export default InputButton;
