import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

const SAvatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Icon = styled.div`
  color: ${(props) => props.theme.borderColor};
`;

interface IAvatarProps {
  url: string;
}

function Avatar({ url = "" }: IAvatarProps) {
  return (
    <SAvatar>
      {url ? (
        <Img src={url} />
      ) : (
        <Icon>
          <FontAwesomeIcon size="xl" icon={faUserCircle} />
        </Icon>
      )}
    </SAvatar>
  );
}

export default Avatar;
