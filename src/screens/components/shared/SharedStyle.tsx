import { styled } from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const Button = styled.div`
  margin: 15px 0px;
  padding: 4px 0px;
  background-color: ${(props) => props.theme.accentNormal};
  text-align: center;
  color: white;
  font-weight: 500;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
`;

export const Notification = styled.div`
  color: #18c460;
`;
