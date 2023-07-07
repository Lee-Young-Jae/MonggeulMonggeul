import React, { useCallback, useState } from "react";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import styled from "styled-components";
import useInput from "@/hooks/common/useInput";
import Button from "@/components/common/button";
import PollSubjectCreateForm from "./components/PollSubjectCreateForm";
import PollDeadlineForm from "./components/PollDeadlineForm";
import PollOptionForm from "./components/PollOptionForm";
import { Poll, createPollRequest } from "@/types/poll";

const PollCreateForm = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1rem;
  width: 80%;
  margin-bottom: 1rem;
`;

const PollCreateTitleInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  font-family: inherit;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;

  &:focus {
    outline: none;
  }
`;

const PollButton = styled(Button)`
  width: 100%;
  border: none;
  border-radius: 15px;
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  color: white;
  font-family: inherit;
  font-size: 1rem;
`;

export type PollSubject = string;

const PollCreatePage = () => {
  const getDateAfter7days = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate.toISOString().split("T")[0];
  };
  const [closingDate, handleCloseDate] = useInput(getDateAfter7days());
  const [closingTime, handleCloseTime] = useInput("23:59");
  const [pollTitle, handlePollTitle] = useInput("");
  const [pollSubjects, setPollSubjects] = useState<PollSubject[]>(["", ""]);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isMultipleChoice, setIsMultipleChoice] = useState<boolean>(false);

  const addPollSubject = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      setPollSubjects([...pollSubjects, ""]);
    },
    [pollSubjects]
  );

  const pollSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      // 유효성 검증
      if (!pollTitle) {
        alert("투표 제목을 입력해주세요.");
        return;
      }
      if (pollSubjects.length < 2) {
        alert("투표 항목을 2개 이상 입력해주세요.");
        return;
      }
      if (pollSubjects.some((subject) => !subject)) {
        alert("투표 항목을 모두 입력해주세요.");
        return;
      }

      const poll: createPollRequest = {
        title: pollTitle,
        closedAt: `${closingDate}T${closingTime}`,
        isAnonymous: isAnonymous,
        isMultipleChoice: isMultipleChoice,
        subjects: pollSubjects,
      };
      console.log(poll);
    },
    [
      pollTitle,
      closingDate,
      closingTime,
      isAnonymous,
      isMultipleChoice,
      pollSubjects,
    ]
  );

  const handlePollSubject = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const { value } = e.target;
      const newPollSubjects = [...pollSubjects];
      newPollSubjects[index] = value;
      setPollSubjects(newPollSubjects);
    },
    [pollSubjects]
  );

  const handleAnonymous = (anonymousStatus: Poll["isAnonymous"]) => {
    setIsAnonymous(anonymousStatus);
  };

  const handleMultipleChoice = (
    multipleChoiceStatus: Poll["isMultipleChoice"]
  ) => {
    setIsMultipleChoice(multipleChoiceStatus);
  };

  return (
    <GroupPage>
      <PageContent>
        <PollCreateForm>
          <PollDeadlineForm
            closingDate={closingDate}
            closingTime={closingTime}
            handleCloseDate={handleCloseDate}
            handleCloseTime={handleCloseTime}
          />
          <PollCreateTitleInput
            onChange={handlePollTitle}
            value={pollTitle}
            placeholder="투표 제목을 입력해주세요"
          />
          <PollOptionForm
            isAnonymous={isAnonymous}
            isMultipleChoice={isMultipleChoice}
            handleIsAnonymous={handleAnonymous}
            handleIsMultipleChoice={handleMultipleChoice}
          />
          <PollSubjectCreateForm
            pollSubjects={pollSubjects}
            handlePollSubject={handlePollSubject}
            setPollSubjects={setPollSubjects}
          />

          <PollButton
            onClick={(e) => {
              addPollSubject(e);
            }}
          >
            +
          </PollButton>
          <PollButton onClick={pollSubmit}>투표 생성하기</PollButton>
        </PollCreateForm>
        <Button
          onClick={() => {
            console.log(pollSubjects);
            console.log(closingDate);
            console.log(closingTime);
            console.log(pollTitle);
            console.log(isAnonymous);
            console.log(isMultipleChoice);
          }}
        >
          지금 상태들을 보여줍니다.
        </Button>
      </PageContent>
    </GroupPage>
  );
};

export default PollCreatePage;
