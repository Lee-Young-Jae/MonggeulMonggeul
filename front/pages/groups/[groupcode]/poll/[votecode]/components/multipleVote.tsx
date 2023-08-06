import { Poll } from "@/types/poll";
import React from "react";
import styled from "styled-components";
import CheckboxGroup from "@/components/common/checkList/checkboxGroup";
import CheckList from "@/components/common/checkList";
import Input from "@/components/common/Input";

const VoteSelectStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

interface MultipleVoteProps {
  poll: Poll;
  selectedSubjectList: string[];
  subjectCommentList: { [key: string]: string };
  handleCheckboxSubject: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubjectComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MultipleVote = ({
  poll,
  selectedSubjectList,
  subjectCommentList,
  handleCheckboxSubject,
  handleSubjectComment,
}: MultipleVoteProps) => {
  return (
    <CheckboxGroup label="여러 항목 투표">
      {poll.PollSubjects.map((subject) => {
        return (
          <VoteSelectStyle key={subject.id}>
            <CheckList
              value={subject.id.toString()}
              handler={handleCheckboxSubject}
            >
              {subject.title}
            </CheckList>
            {selectedSubjectList.includes(subject.id.toString()) && (
              <Input
                width="l"
                value={subjectCommentList[subject.id]}
                name={subject.id.toString()}
                onChange={handleSubjectComment}
                placeholder={`${subject.title}에 대한 의견이 있나요?`}
              ></Input>
            )}
          </VoteSelectStyle>
        );
      })}
    </CheckboxGroup>
  );
};

export default MultipleVote;
