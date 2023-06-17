import Header from "./components/header";
import Menu from "./components/menu";
import styled from "styled-components";
import { TiTicket, TiCalendar, TiMessage } from "react-icons/ti";

const GroupPage = styled.div`
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

const PageContent = styled.div`
  background-color: #f5f5f5;

  padding: 20px;
  padding-bottom: 5rem;
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

const FunctionButton = styled.button`
  width: 100%;
  height: 200px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Nanum Gothic", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(0, 0, 0);
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const FunctionList = styled.div`
  width: 70%;
  height: 100%;
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const group = () => {
  return (
    <GroupPage>
      <Header></Header>
      <PageContent>
        <span>사용할 기능을 선택하세요</span>
        <FunctionList>
          <FunctionButton>
            <TiTicket></TiTicket>
            투표하기
          </FunctionButton>
          <FunctionButton>
            <TiCalendar></TiCalendar>
            약속잡기
          </FunctionButton>
          <FunctionButton>
            <TiMessage></TiMessage>
            채팅하기
          </FunctionButton>
        </FunctionList>
      </PageContent>
      <Menu></Menu>
    </GroupPage>
  );
};

export default group;

// server side rendering

// getServerSideProps
