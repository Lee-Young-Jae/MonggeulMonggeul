import styled from "styled-components";
import RadioGroup from "@/components/common/radio/radioGroup";
import Radio from "@/components/common/radio";

const PollOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioStyle = styled(Radio)`
  margin: 0.5rem 1rem 0.5rem 0;
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
          <RadioStyle
            name="isAnonymous"
            value="isAnonymous"
            onChange={() => handleIsAnonymous(false)}
          >
            기명
          </RadioStyle>
          <RadioStyle
            name="isAnonymous"
            value="isNotAnonymous"
            onChange={() => handleIsAnonymous(true)}
          >
            익명
          </RadioStyle>
        </RadioGroup>

        <RadioGroup label="투표 방식">
          <RadioStyle
            name="isMultipleChoice"
            value="isMultipleChoice"
            onChange={() => handleIsMultipleChoice(false)}
          >
            하나만 투표 가능
          </RadioStyle>
          <RadioStyle
            name="isMultipleChoice"
            value="isNotMultipleChoice"
            onChange={() => handleIsMultipleChoice(true)}
          >
            여러개 투표 가능
          </RadioStyle>
        </RadioGroup>
      </PollOptions>
    </>
  );
};

export default PollOptionForm;
