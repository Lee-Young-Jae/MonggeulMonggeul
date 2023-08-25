import styled from "styled-components";
import Button from "@/components/common/button";
import { Appointment } from "@/types/appointment";

const StyledAppointmentTimePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
`;

const AppointmentTimePicker = ({
  start_time,
  end_time,
  duration_minutes,
  pickedTimes,
  handleTimePick,
  selectedDate,
}: {
  start_time: Appointment["start_time"];
  end_time: Appointment["end_time"];
  duration_minutes: Appointment["duration_minutes"];
  pickedTimes: {
    [key: string]: string[];
  };
  handleTimePick: (time: string) => void;
  selectedDate: string;
}) => {
  // TODO: start_time과 end_time 사이의 시간 중 duration minutes 만큼의 시간을 배열로 만들어서 반환
  const generateTimeArray = (
    startTime: string,
    endTime: string,
    duration_minutes: number
  ) => {
    const isEndTimeNextDay = startTime > endTime;

    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(
      `${isEndTimeNextDay ? "2000-01-02" : "2000-01-01"} ${endTime}`
    );

    const timeArray = [];
    const increment = duration_minutes * 60 * 1000; // 분을 밀리초로 변환

    let currentTime = start;

    // endTime에 도달할 때까지 increment 간격으로 시간을 추가
    while (currentTime <= end) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();

      // 시간을 HH:MM:SS 형식의 문자열로 변환
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

      currentTime = new Date(currentTime.getTime() + increment);
      const formattedCurrentTime = `${currentTime
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      timeArray.push([formattedTime, formattedCurrentTime]);
    }

    if (endTime < timeArray[timeArray.length - 1][1]) {
      timeArray.pop();
    }

    return timeArray;
  };

  const durationTime = generateTimeArray(
    start_time || "00:00",
    end_time || "01:00",
    duration_minutes || 30
  );

  return (
    <>
      <StyledAppointmentTimePicker>
        <p>약속 가능한 모든 시간을 골라보세요</p>
        <p>날짜별로 선택 가능해요 🕑</p>
        {durationTime.map((time) => {
          return (
            <Button
              key={time[0] + time[1]}
              color={
                pickedTimes?.[selectedDate]?.includes(time[0])
                  ? "default"
                  : "unimportant"
              }
              onClick={() => handleTimePick(time[0])}
            >
              <span>{time[0]}</span> ~ <span>{time[1]}</span>
            </Button>
          );
        })}
      </StyledAppointmentTimePicker>
    </>
  );
};

export default AppointmentTimePicker;
