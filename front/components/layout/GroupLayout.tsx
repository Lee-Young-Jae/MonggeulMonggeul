import styled from "styled-components";
import Header from "../common/header";
import Menu from "../common/menu";

const GroupPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  perspective: 1px;
`;

const PageContentStyle = styled.div`
  background-color: #f5f5f5;
  padding-top: 20px;
  padding-bottom: 100px;
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

export type GroupLayoutProps = {
  children: React.ReactNode;
};

export const GroupPage = ({ children }: GroupLayoutProps) => {
  return (
    <GroupPageStyle>
      <Header groupName="test"></Header>
      {children}
      <Menu></Menu>
    </GroupPageStyle>
  );
};

export const PageContent = ({ children }: GroupLayoutProps) => {
  return <PageContentStyle>{children}</PageContentStyle>;
};
