import { styled } from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const Button = styled.div<{ $accent?: boolean }>`
  margin: 10px 0px;
  padding: 8px 0px;
  background-color: ${(props) =>
    props.$accent ? props.theme.accentNormal : props.theme.borderColor};
  text-align: center;
  color: ${(props) =>
    props.$accent ? props.theme.bgColor : props.theme.fontColor};
  font-weight: 500;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
`;

export const Notification = styled.div`
  color: #18c460;
`;

export const FatText = styled.span`
  font-weight: 600;
`;
