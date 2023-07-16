import React from "react";
import styled from "styled-components";

const PollSubjectStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

interface PollSubjectProps {
  title: string;
  voteCount: number;
}

const PollSubject = ({ title, voteCount }: PollSubjectProps) => {
  return (
    <PollSubjectStyle>
      <div>{title}</div>
      <div>{voteCount}</div>
    </PollSubjectStyle>
  );
};

export default PollSubject;
