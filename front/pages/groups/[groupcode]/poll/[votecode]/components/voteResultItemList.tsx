import React from "react";
import styled from "styled-components";
import { subject } from "@/types/poll";
import VoteResultItem from "./voteResultItem";

const VoteResultItemListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

interface VoteResultItemListProps {
  pollSubjects: subject[];
  isAnonymous: boolean;
}

const VoteResultItemList = ({
  pollSubjects,
  isAnonymous,
}: VoteResultItemListProps) => {
  const currentVoteCount = pollSubjects.reduce((acc: number, cur: subject) => {
    return acc + cur.Votes.length;
  }, 0);

  const currentMaxSelectedSubjectCount = pollSubjects.reduce(
    (acc: number, cur: subject) => {
      return acc > cur.Votes.length ? acc : cur.Votes.length;
    },
    0
  );

  return (
    <VoteResultItemListStyle>
      {pollSubjects.map((pollSubject, index) => (
        <VoteResultItem
          key={index}
          subject={pollSubject}
          isAnonymous={isAnonymous}
          currentVoteCount={currentVoteCount}
          currentMaxSelectedSubjectCount={currentMaxSelectedSubjectCount}
        />
      ))}
    </VoteResultItemListStyle>
  );
};

export default VoteResultItemList;
