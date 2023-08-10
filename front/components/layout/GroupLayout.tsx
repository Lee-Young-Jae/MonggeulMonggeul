import styled from "styled-components";
import Header from "../common/header";
import NavigationBar from "../common/navigationBar";

const GroupPageStyle = styled.div`
  height: 100vh;
  height: 100dvh; /* for desktop */
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  perspective: 1px;
  overflow: hidden;
  padding-bottom: 10%;
`;

const PageContentStyle = styled.div`
  background-color: #f5f5f5;
  padding-top: 20px;
  padding-bottom: 100px;
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface GroupLayoutProps {
  children: React.ReactNode;
}

export const GroupPage = ({ children }: GroupLayoutProps) => {
  return (
    <GroupPageStyle>
      <Header></Header>
      {children}
      <NavigationBar />
    </GroupPageStyle>
  );
};

interface PageContentProps {
  children: React.ReactNode;
}

export const PageContent = ({ children }: PageContentProps) => {
  return <PageContentStyle>{children}</PageContentStyle>;
};
