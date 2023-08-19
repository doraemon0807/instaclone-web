import { styled } from "styled-components";

const SSeparator = styled.div`
  display: block;
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.borderColor};
`;

function Separator() {
  return <SSeparator />;
}

export default Separator;
