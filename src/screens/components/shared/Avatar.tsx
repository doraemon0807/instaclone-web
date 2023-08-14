import { styled } from "styled-components";

const SAvatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grayColor};
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

interface IAvatarProps {
  url: string;
}

function Avatar({ url = "" }: IAvatarProps) {
  return <SAvatar>{url ? <Img src={url} /> : null}</SAvatar>;
}

export default Avatar;
