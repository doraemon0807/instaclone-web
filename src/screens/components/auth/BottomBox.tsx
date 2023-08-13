import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { BaseBox } from "../shared/SharedStyle";

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  font-size: 14px;
  span {
    margin-right: 5px;
  }
  a {
    font-weight: 600;
    color: ${(props) => props.theme.accentNormal};
  }
`;

interface IProps {
  cta: string;
  link: string;
  linkText: string;
}

function BottomBox({ cta, link, linkText }: IProps) {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
}
export default BottomBox;
