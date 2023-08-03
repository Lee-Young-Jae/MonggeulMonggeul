import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { useGetPoll } from "@/hooks/queries/poll/useGet";
import { useRouter } from "next/router";
import Loading from "@/components/common/loading";
import { HrStyle } from "@/components/common/menu";
import { getDateString } from "@/utills/common";
import Button from "@/components/common/button";
import { Poll, subject } from "@/types/poll";
import Modal from "@/components/common/modal";

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

interface VoteItemProps {
  current_vote_count: number;
  current_max_selected_subject_count: number;
  voted_count: number;
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

const VoteItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 100%;
`;
const VoteProgressBarStyle = styled.div<VoteItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      (props.voted_count / props.current_max_selected_subject_count) * 100}%;
    background-color: #f4356c;
    animation: ${(props) =>
        Grow(
          (props.voted_count / props.current_max_selected_subject_count) * 100
        )}
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

const VoteCommentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  position: relative;

  & > div {
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ClosedAtStyle = styled.p`
  font-size: 1rem;
  color: #999;
  margin-bottom: 1rem;
`;

const VoteResult = () => {
  const router = useRouter();

  const [openCommentIdModal, setOpenCommentIdModal] =
    useState<Poll["id"]>(Infinity);

  const { data: poll, isLoading } = useGetPoll(router.query.vote as string, {
    enabled: !!router.isReady,
    staleTime: 0,
  });

  const isOver = new Date(poll?.closedAt as string) < new Date();
  const currentVoteCount = poll?.PollSubjects.reduce(
    (acc: number, cur: subject) => {
      return acc + cur.Votes.length;
    },
    0
  );
  const currentUserVoteCount = new Set(
    poll?.PollSubjects.reduce((acc: number[], cur: subject) => {
      return [...acc, ...cur.Votes.map((vote) => vote.UserId)];
    }, [])
  ).size;

  const currentMaxSelectedSubjectCount = poll?.PollSubjects.reduce(
    (acc: number, cur: subject) => {
      return acc > cur.Votes.length ? acc : cur.Votes.length;
    },
    0
  );

  const isAnonymous = poll?.isAnonymous;

  const modalHandler = (subjectId: number) => {
    if (subjectId) {
      setOpenCommentIdModal(Number(subjectId));
    }
  };

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
            <p>{poll?.PollSubjects.length}개의 항목 중</p>
            <p>총 {currentUserVoteCount}명이 투표했습니다.</p>
            <p>총 {currentVoteCount}개의 투표가 있습니다.</p>
            <p>
              최고로 많은 선택을 받은 항목의 투표수:{" "}
              {currentMaxSelectedSubjectCount}개
            </p>
            {poll?.PollSubjects.map((subject) => {
              return (
                <VoteItemStyle key={subject.id}>
                  <VoteProgressBarStyle
                    onClick={() => {
                      if (subject.Votes.length > 0) modalHandler(subject.id);
                    }}
                    current_vote_count={currentVoteCount as number}
                    current_max_selected_subject_count={
                      currentMaxSelectedSubjectCount as number
                    }
                    voted_count={subject.Votes.length}
                  >
                    <div>
                      <p>{subject.title}</p>
                      <p>{subject.Votes.length}표</p>
                    </div>
                  </VoteProgressBarStyle>

                  {openCommentIdModal === subject.id && isAnonymous ? (
                    <Modal
                      visible={openCommentIdModal === subject.id}
                      onClose={() => setOpenCommentIdModal(Infinity)}
                    >
                      {subject.Votes.map((vote) => {
                        return (
                          <VoteCommentStyle key={vote.id}>
                            <div>익명</div>
                            <p>{vote.comment}</p>
                          </VoteCommentStyle>
                        );
                      })}
                    </Modal>
                  ) : openCommentIdModal === subject.id ? (
                    <Modal
                      visible={openCommentIdModal === subject.id}
                      onClose={() => setOpenCommentIdModal(Infinity)}
                    >
                      {subject.Votes.map((vote) => {
                        return (
                          <VoteCommentStyle key={vote.id}>
                            <div>{vote.User.name}</div>
                            <p>{vote.comment}</p>
                          </VoteCommentStyle>
                        );
                      })}
                    </Modal>
                  ) : null}
                </VoteItemStyle>
              );
            })}
          </div>
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
