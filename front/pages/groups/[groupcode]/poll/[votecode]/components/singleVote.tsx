import React from "react";
import styled from "styled-components";

import Radio from "@/components/common/radio";
import RadioGroup from "@/components/common/radio/radioGroup";
import { Poll } from "@/types/poll";
import Input from "@/components/common/Input";

const VoteSelectStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

interface SingleVoteProps {
  poll: Poll;
  selectedSubject: string;
  subjectComment: string;
  handleRadioSubject: (e: React.ChangeEvent<HTMLInputElement>) => void;
  subjectCommentHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SingleVote = ({
  poll,
  selectedSubject,
  subjectComment,
  handleRadioSubject,
  subjectCommentHandler,
}: SingleVoteProps) => {
  return (
    <RadioGroup label="하나의 항목 투표" flex_direction="column">
      {poll.PollSubjects.map((subject) => {
        return (
          <VoteSelectStyle key={subject.id}>
            <Radio
              name={poll.id.toString()}
              value={subject.id.toString()}
              onChange={handleRadioSubject}
            >
              {subject.title}
            </Radio>
            {selectedSubject === subject.id.toString() && (
              <Input
                width="l"
                value={subjectComment}
                name={subject.id.toString()}
                onChange={subjectCommentHandler}
                placeholder={`${subject.title}에 대한 의견이 있나요?`}
              ></Input>
            )}
          </VoteSelectStyle>
        );
      })}
    </RadioGroup>
  );
};

export default SingleVote;
