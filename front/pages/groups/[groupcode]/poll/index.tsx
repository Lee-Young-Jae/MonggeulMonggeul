import React, { useEffect } from "react";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { useRouter } from "next/router";

import styled from "styled-components";
import Button from "@/components/common/button";
import { useGetPolls } from "@/hooks/queries/poll/useGet";
import PollItem from "./components/pollItem";
import { useGetGroup } from "@/hooks/queries/group/useGet";
import Loading from "@/components/common/loading";

const PollList = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 2%;
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
`;

const PollCreateTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PollPage = () => {
  const router = useRouter();

  const { data: polls } = useGetPolls(router.query.groupcode as string, {
    enabled: !!router.isReady,
  });

  const { data: currentGroup } = useGetGroup(router.query.groupcode as string, {
    enabled: !!router.isReady,
  });

  if (!router.isReady) return <Loading />;

  return (
    <GroupPage>
      <PageContent>
        <div>
          <PollCreateTitle>투표 목록</PollCreateTitle>
          <Button
            onClick={() => {
              router.push(`/groups/${router.query.groupcode}/poll/create`);
            }}
          >
            투표 생성하기
          </Button>
        </div>
        <div>
          <span>첫 투표를 만들어보세요!</span>
        </div>
        <PollList>
          {polls?.map((poll) => {
            return (
              <PollItem
                key={poll.id}
                title={poll.title}
                closedAt={poll.closedAt}
                PollSubjects={poll.PollSubjects}
                isAnonymous={poll.isAnonymous}
                isMultiple={poll.isMultiple}
                createdAt={poll.createdAt}
                id={poll.id}
                code={poll.code}
                isVoted={poll.isVoted}
                userCount={currentGroup?.Users.length || 0}
              ></PollItem>
            );
          })}
        </PollList>
      </PageContent>
    </GroupPage>
  );
};

export default PollPage;
