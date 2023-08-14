import { styled } from "styled-components";
import Header from "./Header";
import NavBar from "./NavBar";

const Content = styled.main`
  padding-top: 60px;
  padding-bottom: 30px;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
`;

interface IProps {
  children: React.ReactNode;
}

function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <NavBar />
    </>
  );
}

export default Layout;
