import styled from "styled-components";

const PollCreateDateLabel = styled.label`
  color: rgb(151, 151, 151);
`;

const PollCreateDateInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  font-family: inherit;
`;

interface PollDeadlineFormProps {
  closingDate: string;
  closingTime: string;
  handleCloseDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PollDeadlineForm = ({
  closingDate,
  closingTime,
  handleCloseDate,
  handleCloseTime,
}: PollDeadlineFormProps) => {
  const now_utc = Date.now();
  const timeOff = new Date().getTimezoneOffset() * 60000;
  const [today] = new Date(now_utc - timeOff).toISOString().split("T");

  return (
    <>
      <PollCreateDateLabel>마감시간</PollCreateDateLabel>
      <PollCreateDateInput
        type="date"
        min={today}
        onChange={handleCloseDate}
        aria-label="poll-closingDate"
        defaultValue={closingDate}
        role="textbox"
      />
      <PollCreateDateInput
        type="time"
        onChange={handleCloseTime}
        defaultValue={closingTime}
      />
    </>
  );
};

export default PollDeadlineForm;
