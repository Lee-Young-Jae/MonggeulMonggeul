import { useCallback } from "react";
import { PollSubject } from "../create";
import { TiTrash } from "react-icons/ti";
import styled from "styled-components";

const PollCreateSubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  border: 1px solid #f4356c;
  border-radius: 15px;
  padding: 0.5rem;

  & > svg {
    cursor: pointer;
  }
`;

const PollCreateSubjectInput = styled.input`
  width: 100%;
  border: none;
  font-family: inherit;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

interface PollSubjectCreateFormProps {
  pollSubjects: PollSubject[];
  handlePollSubject: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  setPollSubjects: React.Dispatch<React.SetStateAction<PollSubject[]>>;
}

const PollSubjectCreateForm = ({
  pollSubjects,
  handlePollSubject,
  setPollSubjects,
}: PollSubjectCreateFormProps) => {
  const deletePollSubject = useCallback(
    (index: number) => {
      if (pollSubjects.length <= 2) {
        alert("항목은 최소 2개 이상이어야 합니다.");
        return;
      }

      confirm("정말로 삭제하시겠습니까?") &&
        setPollSubjects(
          pollSubjects.filter((_, itemIndex) => itemIndex !== index)
        );
    },
    [pollSubjects, setPollSubjects]
  );

  return (
    <>
      {pollSubjects?.map((item, index) => (
        <PollCreateSubjectItem key={index}>
          <PollCreateSubjectInput
            placeholder="선택 항목을 입력해주세요"
            value={item}
            onChange={(e) => handlePollSubject(e, index)}
          ></PollCreateSubjectInput>
          <TiTrash
            onClick={() => {
              deletePollSubject(index);
            }}
          ></TiTrash>
        </PollCreateSubjectItem>
      ))}
    </>
  );
};

export default PollSubjectCreateForm;
