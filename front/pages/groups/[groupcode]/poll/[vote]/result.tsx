import React from "react";
import styled from "styled-components";

import Loading from "@/components/common/loading";
import Button from "@/components/common/button";
import VoteResultItemList from "./components/voteResultItemList";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { useGetPoll } from "@/hooks/queries/poll/useGet";
import { useRouter } from "next/router";
import { HrStyle } from "@/components/common/menu";

import { getDateString } from "@/utills/common";

const PollTitleStyle = styled.div`
  font-size: 1.5rem;
`;

export const VoteStyle = styled.div`
  background-color: white;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  border-radius: 15px;
  padding: 0.5rem;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: white;
  width: 80%;
  box-sizing: border-box;
  padding: 1rem;
`;

const ClosedAtStyle = styled.p`
  font-size: 1rem;
  color: #999;
  margin-bottom: 1rem;
`;

const VoteResult = () => {
  const router = useRouter();

  const { data: poll, isLoading } = useGetPoll(router.query.vote as string, {
    enabled: !!router.isReady,
    staleTime: 0,
  });

  const isOver = new Date(poll?.closedAt as string) < new Date();

  if (isLoading) {
    return <Loading />;
  }

  if (!poll) {
    return <div>투표가 존재하지 않습니다.</div>;
  }

  const isAnonymous = poll?.isAnonymous;

  return (
    <GroupPage>
      <PageContent>
        <VoteStyle>
          <PollTitleStyle>{poll?.title}</PollTitleStyle>
          <HrStyle />
          <ClosedAtStyle>
            {getDateString(new Date(poll?.closedAt as string))}까지
          </ClosedAtStyle>

          {poll?.PollSubjects && (
            <VoteResultItemList
              isAnonymous={isAnonymous}
              pollSubjects={poll?.PollSubjects}
            ></VoteResultItemList>
          )}
          {!isOver && (
            <Button
              onClick={() => {
                router.push(
                  `/groups/${router.query.groupcode}/poll/${router.query.vote}`
                );
              }}
            >
              재투표하기
            </Button>
          )}
          {isOver && <Button>투표 결과 공유하기</Button>}
        </VoteStyle>
      </PageContent>
    </GroupPage>
  );
};

export default VoteResult;
