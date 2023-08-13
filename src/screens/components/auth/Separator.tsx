import { styled } from "styled-components";

const SSeparator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 270px;
  margin-bottom: 30px;

  div {
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }

  span {
    display: block;
    padding: 0px 16px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
    color: #616161;
  }
`;

interface IProps {
  value: string;
}

function Separator({ value }: IProps) {
  return (
    <SSeparator>
      <div></div>
      <span>{value}</span>
      <div></div>
    </SSeparator>
  );
}

export default Separator;
