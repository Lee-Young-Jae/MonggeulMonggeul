import styled from "styled-components";
import RadioGroup from "@/components/common/radio/radioGroup";
import Radio from "@/components/common/radio";

const PollOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

interface PollOptionFormProps {
  handleIsAnonymous: (state: boolean) => void;
  handleIsMultipleChoice: (state: boolean) => void;
}

const PollOptionForm = ({
  handleIsAnonymous,
  handleIsMultipleChoice,
}: PollOptionFormProps) => {
  return (
    <>
      <PollOptions>
        <RadioGroup label="투표 방식">
          <Radio
            name="isAnonymous"
            value="true"
            onChange={() => handleIsAnonymous(true)}
          >
            기명
          </Radio>
          <Radio
            name="isAnonymous"
            value="false"
            onChange={() => handleIsAnonymous(false)}
          >
            익명
          </Radio>
        </RadioGroup>

        <RadioGroup label="투표 방식">
          <Radio
            name="isMultipleChoice"
            value="true"
            onChange={() => handleIsMultipleChoice(true)}
          >
            하나만 투표 가능
          </Radio>
          <Radio
            name="isMultipleChoice"
            value="false"
            onChange={() => handleIsMultipleChoice(false)}
          >
            여러개 투표 가능
          </Radio>
        </RadioGroup>
      </PollOptions>
    </>
  );
};

export default PollOptionForm;
