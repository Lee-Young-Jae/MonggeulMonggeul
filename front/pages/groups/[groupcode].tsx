import styled from "styled-components";
import { TiTicket, TiCalendar, TiMessage } from "react-icons/ti";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGetGroup } from "@/hooks/queries/group/useGet";
import Loading from "@/components/common/loading";

const FunctionList = styled.div`
  box-sizing: border-box;
  padding: 5%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const FunctionButton = styled.button`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: white;
  border-radius: 14px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
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
            </>
          )}
        </FunctionList>
      </PageContent>
    </GroupPage>
  );
};

export default Group;
