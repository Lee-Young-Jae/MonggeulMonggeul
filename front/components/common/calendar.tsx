import styled, { css } from "styled-components";
import { SetStateAction, useState, Dispatch } from "react";

const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const StyledMonth = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledPrevButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledNextButton = styled(StyledPrevButton)``;

const StyledMonthTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledWeekends = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
  justify-items: center;
`;

const StyledWeekDay = styled.span`
  font-weight: bold;
`;

const StyledDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
`;

const StyledMonthDay = styled.div`
  width: 60%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-bottom: 2px solid transparent;
`;

const StyledPrevMonthDay = styled(StyledMonthDay)<{ $isHidden: boolean }>`
  color: #adb5bd;
  ${({ $isHidden }) => $isHidden && "visibility: hidden;"}
`;

const StyledNextMonthDay = styled(StyledMonthDay)`
  color: #adb5bd;
`;

interface StyledCurrentMonthDayProps {
  $isBetweenStartEndDate?: boolean;
  $isStartOrEndDate?: boolean;
  $isSelectedDate?: boolean;
}

const StyledCurrentMonthDay = styled(
  StyledMonthDay
)<StyledCurrentMonthDayProps>`
  ${({ $isBetweenStartEndDate }) =>
    $isBetweenStartEndDate &&
    css`
      border-bottom: 2px solid #fc7979;
    `}
  ${({ $isStartOrEndDate }) =>
    $isStartOrEndDate &&
    css`
      border-bottom: 2px solid #fc7979;
    `}
  ${({ $isSelectedDate }) =>
    $isSelectedDate &&
    css`
      border-bottom: 2px solid #fc7979;
    `}
`;

const StyledCurrentMonthDayPrevToday = styled(StyledCurrentMonthDay)`
  &:hover {
    border: none;
  }
  color: #adb5bd;
`;

const StyledCurrentMonthDayToday = styled(StyledCurrentMonthDay)``;

const StyledCurrentMonthDayNotInStartAndEndDate = styled(StyledCurrentMonthDay)`
  &:hover {
    border: none;
  }

  color: #adb5bd;
`;

const weeks = ["일", "월", "화", "수", "목", "금", "토"];

type Props = {
  version?: "default" | "select";
  startDate: string;
  endDate: string;
  selectedDate?: string;
  setStartDate?: Dispatch<SetStateAction<string>>;
  setEndDate?: Dispatch<SetStateAction<string>>;
  setSelectedDate?: Dispatch<SetStateAction<string>>;
};

function Calendar({
  version = "default",
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  selectedDate,
  setSelectedDate,
}: Props) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const isCurrentMonth =
    new Date().getMonth() === currentMonth &&
    new Date().getFullYear() === currentYear;

  const formatDate = (day: number) =>
    `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  // NOTE: UI - 여기 있어도 될듯, date에 의존적이다 - start
  const getPrevMonthDays = () => {
    const copiedCurrentDate = new Date(currentDate.getTime());
    copiedCurrentDate.setDate(1);
    const firstDayIndex = copiedCurrentDate.getDay(); // 1일의 요일

    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();

    return Array.from(
      { length: firstDayIndex },
      (v, i) => prevMonthLastDay - (firstDayIndex - i) + 1
    );
  };

  const getCurrentMonthDays = () => {
    const currentMonthLastDay = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    return Array.from({ length: currentMonthLastDay }, (v, i) => i + 1);
  };

  const getNextMonthDays = () => {
    const lastDayIndex = new Date(currentYear, currentMonth + 1, 0).getDay(); // 막날의 요일
    const nextDays = 7 - lastDayIndex - 1; // 다음달 날짜

    return Array.from({ length: nextDays }, (v, i) => i + 1);
  };
  // NOTE: UI - 여기 있어도 될듯, currentDate에 의존적이다 - end

  const handleShowPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleShowNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleStartOrEndDate = (day: number) => () => {
    // TODO: 약속잡기 진행페이지에서는 사용되지 않기 때문에, 분기처리를 해줌
    if (!startDate) {
      setStartDate?.(formatDate(day));

      return;
    }

    if (endDate || isBeforeStartDate(day)) {
      setEndDate?.("");
      setStartDate?.(formatDate(day));

      return;
    }

    setEndDate?.(formatDate(day));
  };

  const handleSelectedDate = (day: number) => () => {
    setSelectedDate?.(formatDate(day));
  };

  const isPrevToday = (day: number) =>
    new Date(`${currentYear}-${currentMonth}-${day}`) <
    new Date(
      `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    );

  const isToday = (day: number) =>
    currentYear === new Date().getFullYear() &&
    currentMonth === new Date().getMonth() &&
    day === new Date().getDate();

  const isBetweenStartEndDate = (day: number) => {
    const targetDate = new Date(formatDate(day));

    return new Date(startDate) < targetDate && targetDate < new Date(endDate);
  };

  const isStartOrEndDate = (day: number) =>
    startDate === formatDate(day) || endDate === formatDate(day);

  const isBeforeStartDate = (day: number) =>
    new Date(`${currentYear}-${currentMonth + 1}-${day}`) < new Date(startDate);

  const isNotInStartAndEndDate = (day: number) => {
    const targetDate = new Date(formatDate(day));

    return new Date(startDate) > targetDate || targetDate > new Date(endDate);
  };

  const isSelectedDate = (day: number) => formatDate(day) === selectedDate;

  return (
    <StyledContainer>
      <StyledMonth>
        <StyledPrevButton
          onClick={handleShowPrevMonth}
          disabled={isCurrentMonth}
          aria-label="prev-month"
        >
          {/* TODO: 이런 방식이 괜찮은 방법인지 고민하기 */}
          &#8249;
        </StyledPrevButton>
        <StyledMonthTitle>
          {currentDate.getFullYear()}년 {currentMonth + 1}월
        </StyledMonthTitle>
        <StyledNextButton onClick={handleShowNextMonth} aria-label="next-month">
          &#8250;
        </StyledNextButton>
      </StyledMonth>
      <StyledWeekends>
        {weeks.map((day) => (
          <StyledWeekDay key={day}>{day}</StyledWeekDay>
        ))}
      </StyledWeekends>
      <StyledDays>
        {getPrevMonthDays().map((day) => (
          <StyledPrevMonthDay
            key={day}
            onClick={handleShowPrevMonth}
            $isHidden={isCurrentMonth}
          >
            {day}
          </StyledPrevMonthDay>
        ))}

        {version === "select"
          ? getCurrentMonthDays().map((day) => {
              if (isNotInStartAndEndDate(day)) {
                return (
                  // TODO: 변수명 생각해보기
                  <StyledCurrentMonthDayNotInStartAndEndDate
                    key={day}
                    aria-label={`${String(currentMonth + 1).padStart(
                      2,
                      "0"
                    )}-${String(day).padStart(2, "0")}`}
                  >
                    {day}
                  </StyledCurrentMonthDayNotInStartAndEndDate>
                );
              }

              return (
                <StyledCurrentMonthDay
                  key={day}
                  onClick={handleSelectedDate(day)}
                  $isSelectedDate={isSelectedDate(day)}
                  aria-label={`${String(currentMonth + 1).padStart(
                    2,
                    "0"
                  )}-${String(day).padStart(2, "0")}`}
                >
                  {day}
                </StyledCurrentMonthDay>
              );
            })
          : getCurrentMonthDays().map((day) => {
              // TODO: isBeforeTody로 변경할까?
              if (isPrevToday(day)) {
                return (
                  <StyledCurrentMonthDayPrevToday
                    key={day}
                    // TODO: 값 리팩토링 필요
                    aria-label={`${String(currentMonth + 1).padStart(
                      2,
                      "0"
                    )}-${String(day).padStart(2, "0")}`}
                  >
                    {day}
                  </StyledCurrentMonthDayPrevToday>
                );
              }

              if (isToday(day)) {
                return (
                  <StyledCurrentMonthDayToday
                    // TODO: 약속잡기 진행페이지에서는 사용되지 않기 때문에, 분기처리를 해줌
                    key={day}
                    onClick={
                      setStartDate && setEndDate && handleStartOrEndDate(day)
                    }
                    $isBetweenStartEndDate={isBetweenStartEndDate(day)}
                    $isStartOrEndDate={isStartOrEndDate(day)}
                    aria-label={`${String(currentMonth + 1).padStart(
                      2,
                      "0"
                    )}-${String(day).padStart(2, "0")}`}
                  >
                    {day}
                  </StyledCurrentMonthDayToday>
                );
              }

              return (
                <StyledCurrentMonthDay
                  key={day}
                  onClick={handleStartOrEndDate(day)}
                  $isBetweenStartEndDate={isBetweenStartEndDate(day)}
                  $isStartOrEndDate={isStartOrEndDate(day)}
                  aria-label={`${String(currentMonth + 1).padStart(
                    2,
                    "0"
                  )}-${String(day).padStart(2, "0")}`}
                >
                  {day}
                </StyledCurrentMonthDay>
              );
            })}

        {getNextMonthDays().map((day) => (
          <StyledNextMonthDay key={day} onClick={handleShowNextMonth}>
            {day}
          </StyledNextMonthDay>
        ))}
      </StyledDays>
    </StyledContainer>
  );
}

export default Calendar;
