import Button from "@/components/common/button";
import styled, { css } from "styled-components";
import { Poll } from "@/types/poll";

const PollOptions = styled.div`
  display: flex;
  align-items: center;
`;

const PollOptionButton = styled(Button)<{ active: "true" | "false" }>`
  margin-top: 15px;
  margin-right: 0.5rem;

  ${({ active }) =>
    active === "true" &&
    css`
      background-color: #f4356c;
      color: #fff;
    `}
`;

interface PollOptionFormProps {
  isAnonymous: Poll["isAnonymous"];
  isMultipleChoice: Poll["isMultiple"];
  handleIsAnonymous: (state: boolean) => void;
  handleIsMultipleChoice: (state: boolean) => void;
}

const PollOptionForm = ({
  isAnonymous,
  isMultipleChoice,
  handleIsAnonymous,
  handleIsMultipleChoice,
}: PollOptionFormProps) => {
  return (
    <>
      <PollOptions>
        <PollOptionButton
          outlined
          active={isAnonymous ? "false" : "true"}
          size="s"
          onClick={() => handleIsAnonymous(!isAnonymous)}
        >
          기명
        </PollOptionButton>
        <PollOptionButton
          active={isAnonymous ? "true" : "false"}
          outlined
          size="s"
          onClick={() => handleIsAnonymous(!isAnonymous)}
        >
          익명
        </PollOptionButton>
      </PollOptions>
      <PollOptions>
        <PollOptionButton
          active={isMultipleChoice ? "false" : "true"}
          outlined
          size="s"
          onClick={() => {
            handleIsMultipleChoice(!isMultipleChoice);
          }}
        >
          하나만 투표 가능
        </PollOptionButton>
        <PollOptionButton
          active={isMultipleChoice ? "true" : "false"}
          outlined
          size="s"
          onClick={() => {
            handleIsMultipleChoice(!isMultipleChoice);
          }}
        >
          여러개 투표 가능
        </PollOptionButton>
      </PollOptions>
    </>
  );
};

export default PollOptionForm;
