import { css, styled } from "styled-components";
import { BaseBox } from "../shared/SharedStyle";

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 0px 25px 0px;
  margin-bottom: 10px;
`;

const SubContainer = styled.div<{ maxWidth?: number }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${(props) =>
    props.maxWidth
      ? css`
          max-width: ${props.maxWidth}px;
        `
      : css``}
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;

interface IProps {
  children: React.ReactNode;
  maxWidth?: number;
}

function FormBox({ children, maxWidth }: IProps) {
  return (
    <Container>
      <SubContainer maxWidth={maxWidth}>{children}</SubContainer>
    </Container>
  );
}

export default FormBox;
