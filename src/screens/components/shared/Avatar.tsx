import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css, styled } from "styled-components";

const SAvatar = styled.div<{ size?: string }>`
  ${(props) =>
    props.size === "sm"
      ? css`
          width: 26px;
          height: 26px;
          min-width: 26px;
          min-height: 26px;
        `
      : props.size === "lg"
      ? css`
          width: 80px;
          height: 80px;
          min-width: 80px;
          min-height: 80px;
        `
      : props.size === "xl"
      ? css`
          width: 150px;
          height: 150px;
          min-width: 150px;
          min-height: 150px;
        `
      : css`
          width: 36px;
          height: 36px;
          min-width: 36px;
          min-height: 36px;
        `}
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Icon = styled.div<{ size?: string }>`
  color: ${(props) => props.theme.borderColor};

  ${(props) =>
    props.size === "sm"
      ? css`
          width: 26px;
          height: 26px;
          min-width: 26px;
          min-height: 26px;
        `
      : props.size === "lg"
      ? css`
          width: 80px;
          height: 80px;
          min-width: 80px;
          min-height: 80px;
        `
      : props.size === "xl"
      ? css`
          width: 150px;
          height: 150px;
          min-width: 150px;
          min-height: 150px;
        `
      : css`
          width: 36px;
          height: 36px;
          min-width: 36px;
          min-height: 36px;
        `}

  svg {
    width: 100%;
    height: 100%;
  }
`;

interface IAvatarProps {
  url?: string | null;
  size?: "sm" | "lg" | "xl";
}

function Avatar({ url = "", size }: IAvatarProps) {
  return (
    <SAvatar size={size}>
      {url ? (
        <Img src={url} />
      ) : (
        <Icon size={size}>
          <FontAwesomeIcon size="xl" icon={faUserCircle} />
        </Icon>
      )}
    </SAvatar>
  );
}

export default Avatar;
