import React from "react";
import styled, { keyframes } from "styled-components";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { useGetPoll } from "@/hooks/queries/poll/useGet";
import { useRouter } from "next/router";
import Loading from "@/components/common/loading";
import { HrStyle } from "@/components/common/menu";
import { VoteStyle } from "./component";
import { getDateString } from "@/utills/common";
import Button from "@/components/common/button";
import { subject } from "@/types/poll";

const PollTitleStyle = styled.div`
  font-size: 1.5rem;
`;

interface VoteItemProps {
  currentVoteCount: number;
  currentMaxSelectedSubjectCount: number;
  votedCount: number;
}

const Grow = (width: number) => keyframes`
  from {
    width: 2%;
    opacity: 0.2;
  }
  to {
    width: ${width}%;
    opacity: 1;
  }
`;

const VoteItemStyle = styled.div<VoteItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 14px;
  position: relative;
  overflow: hidden;
  background-color: #f8c6d2;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${(props) =>
      (props.votedCount / props.currentMaxSelectedSubjectCount) * 100}%;
    background-color: #f4356c;
    animation: ${(props) =>
        Grow((props.votedCount / props.currentMaxSelectedSubjectCount) * 100)}
      1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  & > div > p {
    margin: 0;
    z-index: 1;
  }
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
  });

  const isOver = new Date(poll?.closedAt as string) < new Date();
  const currentVoteCount = poll?.PollSubjects.reduce(
    (acc: number, cur: subject) => {
      return acc + cur.Votes.length;
    },
    0
  );

  const currentMaxSelectedSubjectCount = poll?.PollSubjects.reduce(
    (acc: number, cur: subject) => {
      return acc > cur.Votes.length ? acc : cur.Votes.length;
    },
    0
  );

  console.log(currentVoteCount);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <GroupPage>
      <PageContent>
        <VoteStyle>
          <PollTitleStyle>{poll?.title}</PollTitleStyle>
          <HrStyle />
          <div>
            <ClosedAtStyle>
              {getDateString(new Date(poll?.closedAt as string))}까지
            </ClosedAtStyle>
            <p>총 {poll?.PollSubjects.length}개의 항목 중</p>
            <p>총 {currentVoteCount}명이 투표했습니다.</p>
            <p>
              최고로 많은 선택을 받은 항목의 투표수:{" "}
              {currentMaxSelectedSubjectCount}개
            </p>
            {poll?.PollSubjects.map((subject) => {
              return (
                <div key={subject.id}>
                  <VoteItemStyle
                    currentVoteCount={currentVoteCount as number}
                    currentMaxSelectedSubjectCount={
                      currentMaxSelectedSubjectCount as number
                    }
                    votedCount={subject.Votes.length}
                  >
                    <div>
                      <p>{subject.title}</p>
                      <p>{subject.Votes.length}표</p>
                    </div>
                  </VoteItemStyle>
                  {subject.Votes.map((vote) => {
                    return (
                      <>
                        <div key={vote.id}>{vote.User.name}</div>
                        {vote.comment && <div>{vote.comment}</div>}
                      </>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {!isOver && <Button>재투표하기</Button>}
          {isOver && <Button>투표 결과 공유하기</Button>}
        </VoteStyle>
      </PageContent>
    </GroupPage>
  );
};

export default VoteResult;
