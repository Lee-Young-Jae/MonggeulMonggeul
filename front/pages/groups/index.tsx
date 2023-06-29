import Logo from "@/assets/Logo_no_background.png";
import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import RegisterContent from "./components/registerContent";
import { useQuery } from "@tanstack/react-query";
import { fetchGetLoginInfo } from "@/apis/auth";

const GroupsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`;

const ExplanSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const RegisterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 50vh;
  width: 100vw;
  background-color: #f8c6d2;
  overflow: hidden;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;

  color: #666666;
`;

const GroupsPage = () => {
  const [groupCreateMode, setGroupCreateMode] = useState(false);
  const [groupJoinMode, setGroupJoinMode] = useState(false);

  useQuery(["loginCheck"], fetchGetLoginInfo);

  return (
    <GroupsWrapper>
      <ExplanSection>
        <Image priority src={Logo} alt="logo" width="100" height="100" />
        <Title>새로운 모임에 참여해볼까요?</Title>
        <Description>
          아직 가입한 모임이 없어요. <br />
          새로운 모임을 생성하거나, 초대받은 모임에 참가해 몽글몽글을
          시작해보세요!
        </Description>
      </ExplanSection>
      <RegisterSection>
        <RegisterContent
          isSelected={groupCreateMode}
          setGroupHandler={setGroupCreateMode}
          title="새로운 모임 생성하기"
          description="새로운 모임을 생성하고, 친구들을 초대해보세요!"
          inputPlaceholder="모임 이름을 입력해주세요"
          buttonText="생성하기"
        />
        <RegisterContent
          isSelected={groupJoinMode}
          setGroupHandler={setGroupJoinMode}
          title="초대받은 모임 참가하기"
          description="친구들이 초대한 모임에 참가해보세요!"
          inputPlaceholder="초대 코드를 입력해주세요"
          buttonText="참가하기"
        />
      </RegisterSection>
    </GroupsWrapper>
  );
};

export default GroupsPage;
