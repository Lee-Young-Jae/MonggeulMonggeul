import styled from "styled-components";
import { TiTicket, TiCalendar, TiMessage } from "react-icons/ti";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGetGroup } from "@/hooks/queries/group/useGet";
import Loading from "@/components/common/loading";

const FunctionList = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2rem;
`;

const FunctionButton = styled.button`
  width: 95%;
  height: 125px;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 14px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  font-family: "omyuPretty", sans-serif;
  // font gradient
  transition: 0.2s;

  &:hover {
    background: linear-gradient(
      40deg,
      rgba(244, 53, 108, 0.01) 0%,
      rgba(255, 0, 0, 0.03) 50%,
      rgba(255, 154, 0, 0.01) 100%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

const Group = () => {
  const router = useRouter();
  const { groupcode } = router.query;

  const { data: group, isLoading } = useGetGroup(String(groupcode), {
    enabled: !!groupcode,
  });

  useEffect(() => {
    if (!router.isReady) return;
  }, [group, router.isReady]);

  return (
    <GroupPage>
      <PageContent>
        <span>사용할 기능을 선택하세요!</span>
        <FunctionList>
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <>
              <FunctionButton
                onClick={() => {
                  router.push(`/groups/${groupcode}/poll`);
                }}
              >
                <TiTicket size={80} color="#F4356C" />
                투표하기
              </FunctionButton>
              <FunctionButton
                onClick={() => {
                  router.push(`/groups/${groupcode}/appointment`);
                }}
              >
                <TiCalendar size={80} color="#F4356C" />
                약속잡기
              </FunctionButton>
              <FunctionButton
                onClick={() => {
                  router.push(`/groups/${groupcode}/chat`);
                }}
              >
                <TiMessage size={80} color="#F4356C" />
                채팅하기
              </FunctionButton>
            </>
          )}
        </FunctionList>
      </PageContent>
    </GroupPage>
  );
};

export default Group;
