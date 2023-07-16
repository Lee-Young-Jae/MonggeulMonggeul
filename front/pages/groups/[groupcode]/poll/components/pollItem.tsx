import Button from "@/components/common/button";
import { Poll } from "@/types/poll";
import { getDateString } from "@/utills/common";
import React, { use } from "react";
import styled from "styled-components";
import PollSubject from "./pollSubject";
import { useDeletePoll } from "@/hooks/queries/poll/useDelete";

const PollItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  border-radius: 15px;
  padding: 0.5rem;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 1rem;
  border-radius: 15px;
  background-color: #ccc;
`;

const OptionStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  border-radius: 15px;
  padding: 0.5rem;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const PollItem = ({
  id,
  title,
  isAnonymous,
  isMultiple,
  closedAt,
  PollSubjects,
}: Poll) => {
  const { mutate } = useDeletePoll();

  return (
    <PollItemStyle>
      <div>공유하기 버튼</div>
      <div>{title}</div>
      <ProgressBar></ProgressBar>
      <p>0명/1명</p>
      <div>
        투표 설정
        <OptionStyle>{isAnonymous ? "익명" : "기명"} </OptionStyle>
        <OptionStyle>
          {isMultiple ? "여러개 투표가능" : "하나만 투표 가능"}
        </OptionStyle>
      </div>
      <div>{getDateString(new Date(closedAt))}까지</div>
      {PollSubjects?.map((subject, index) => {
        return (
          <PollSubject
            key={index}
            title={subject.title}
            voteCount={subject.Votes.length}
          />
        );
      })}

      <Button
        onClick={() => {
          mutate(id);
        }}
      >
        투표 삭제하기
      </Button>
      <Button>재투표하기</Button>
    </PollItemStyle>
  );
};

export default PollItem;
