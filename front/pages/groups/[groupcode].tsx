import styled from "styled-components";
import { TiTicket, TiCalendar, TiMessage } from "react-icons/ti";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGetGroup } from "@/hooks/queries/group/useGet";
import { groupAtom } from "@/recoil/state/groupstate";
import { useRecoilState } from "recoil";

const FunctionButton = styled.button`
  width: 100%;
  height: 200px;
  margin-top: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(0, 0, 0);
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  font-family: "omyuPretty", sans-serif;
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
`;

const Group = () => {
  const router = useRouter();
  const { groupcode } = router.query;

  if (typeof String(groupcode) === "undefined") {
    router.push("/");
  }

  const { data: group, isLoading } = useGetGroup(String(groupcode));
  const [groupState, setGroupState] = useRecoilState(groupAtom);

  useEffect(() => {
    if (group) {
      setGroupState({
        currentGroup: group,
      });
    }
  }, [group, setGroupState]);

  return (
    <GroupPage>
      <PageContent>
        <span>사용할 기능을 선택하세요!</span>
        <FunctionList>
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
        </FunctionList>
      </PageContent>
    </GroupPage>
  );
};

export default Group;