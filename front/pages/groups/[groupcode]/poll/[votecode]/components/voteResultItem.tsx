import Loading from "@/components/common/loading";
import Modal from "@/components/common/modal";
import { Poll, subject } from "@/types/poll";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const VoteItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 100%;
`;

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

interface VoteItemStyleProps {
  current_vote_count: number;
  current_max_selected_subject_count: number;
  voted_count: number;
}

const VoteProgressBarStyle = styled.div<VoteItemStyleProps>`
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

interface VoteItemProps {
  subject: subject;
  isAnonymous: boolean;
  currentVoteCount: number;
  currentMaxSelectedSubjectCount: number;
}

const VoteResultItem = ({
  subject,
  isAnonymous,
  currentVoteCount,
  currentMaxSelectedSubjectCount,
}: VoteItemProps) => {
  const [openCommentIdModal, setOpenCommentIdModal] =
    useState<Poll["id"]>(Infinity);

  const modalHandler = (subjectId: number) => {
    if (subjectId) {
      setOpenCommentIdModal(Number(subjectId));
    }
  };

  if (!subject) {
    return <Loading />;
  }

  return (
    <VoteItemStyle>
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
      ) : (
        openCommentIdModal === subject.id && (
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
        )
      )}
    </VoteItemStyle>
  );
};

export default VoteResultItem;
