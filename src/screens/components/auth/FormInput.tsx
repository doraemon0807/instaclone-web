import { styled } from "styled-components";

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 8px;
  border: 1px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  font-size: 12px;
  box-sizing: border-box;
  margin: 3px 0px;
  border-radius: 3px;
`;

export default Input;
