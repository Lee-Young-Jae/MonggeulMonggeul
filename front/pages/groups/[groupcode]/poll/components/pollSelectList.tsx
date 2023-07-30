import Radio from "@/components/common/radio";
import RadioGroup from "@/components/common/radio/radioGroup";
import { subject } from "@/types/poll";
import React from "react";
import styled from "styled-components";

const RadioStyle = styled(Radio)`
  margin-right: 3rem;
`;

interface PollSubjectProps {
  PollSubjects: subject[];
}

const PollSelectList = ({ PollSubjects }: PollSubjectProps) => {
  return (
    <RadioGroup label="어디에 투표할까요?">
      {PollSubjects?.map((subject, index) => {
        return (
          <RadioStyle
            key={subject.id}
            name={subject.title}
            value={subject.title}
            onChange={() => {}}
          >
            {subject.title}
          </RadioStyle>
        );
      })}
    </RadioGroup>
  );
};

export default PollSelectList;
