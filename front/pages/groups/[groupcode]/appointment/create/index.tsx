import React, { useState } from "react";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import styled from "styled-components";
import Calendar from "@/components/common/calendar";
import { useCreateAppointment } from "@/hooks/queries/appointment/useCreate";
import useInput from "@/hooks/common/useInput";
import { useRouter } from "next/router";
import Input from "@/components/common/Input";
import Button from "@/components/common/button";
import SelectBox from "@/components/common/selectBox";

const AppointmentCreateContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 40px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 14px;
`;

const DurationContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const now_utc = Date.now();
const timeOff = new Date().getTimezoneOffset() * 60000;
const [today] = new Date(now_utc - timeOff).toISOString().split("T");
const after7days = new Date(now_utc - timeOff + 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];
const AppointmentCreate = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, onChangeTitle] = useInput("");
  const [subTitle, onChangeSubTitle] = useInput("");
  const [startTime, onChangeStartTime] = useInput("");
  const [endTime, onChangeEndTime] = useInput("");
  const [deadLine, setDeadLine] = useState(after7days);
  const [duration, setDuration] = useState<{ hours: number; minutes: number }>({
    hours: 0,
    minutes: 0,
  });

  const router = useRouter();

  const { mutate: createAppointment } = useCreateAppointment();

  const onSubmit = () => {
    if (title === "") {
      alert("제목을 입력해주세요");
      return;
    }

    if (subTitle === "") {
      alert("약속의 설명을 입력해주세요");
      return;
    }

    if (startTime === "") {
      alert("시작 시간을 입력해주세요");
      return;
    }

    if (endTime === "") {
      alert("종료 시간을 입력해주세요");
      return;
    }

    if (startTime > endTime) {
      console.log(startTime, endTime);
      alert("시작 시간이 종료 시간보다 늦습니다");
      return;
    }

    if (deadLine === "") {
      alert("마감 시간을 입력해주세요");
      return;
    }

    if (deadLine < new Date().toISOString()) {
      alert("마감 시간이 현재 시간보다 빠릅니다");
      return;
    }

    if (startDate === "") {
      alert("시작 날짜를 선택해주세요");
      return;
    }

    if (endDate === "") {
      alert("종료 날짜를 선택해주세요");
      return;
    }

    if (startDate > endDate) {
      alert("시작 날짜가 종료 날짜보다 늦습니다");
      return;
    }

    console.log(
      router.query.groupcode as string,
      title,
      subTitle,
      startDate,
      "startDate",
      endDate,
      "endDate",
      startTime,
      "startTime",
      endTime,
      "endTime",
      deadLine,
      "deadLine"
    );

    createAppointment({
      group_code: router.query.groupcode as string,
      title,
      sub_title: subTitle,
      start_date: new Date(startDate),
      end_date: new Date(endDate),
      start_time: startTime,
      end_time: endTime,
      deadline: new Date(deadLine),
      duration_minutes: duration?.hours * 60 + duration?.minutes,
    });
  };

  return (
    <GroupPage>
      <PageContent>
        <Calendar
          endDate={endDate}
          startDate={startDate}
          selectedDate={selectedDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          setSelectedDate={setSelectedDate}
          version="default"
        ></Calendar>

        <AppointmentCreateContainer>
          <label>제목</label>
          <Input value={title} onChange={onChangeTitle}></Input>
          <label>부제목</label>
          <Input value={subTitle} onChange={onChangeSubTitle}></Input>
          <label>진행 시간 설정</label>
          <DurationContainer>
            <SelectBox<number>
              value={duration.hours}
              onChange={(e) => {
                setDuration({ ...duration, hours: ~~e.target.value });
              }}
              options={new Array(23).fill(0).map((_, index) => index)}
            ></SelectBox>
            <span>시간</span>
            <SelectBox<number>
              value={duration.hours}
              onChange={(e) => {
                setDuration({ ...duration, minutes: ~~e.target.value });
              }}
              options={[0, 30]}
            ></SelectBox>
            <span>분</span>
          </DurationContainer>

          <label>시작 시간</label>
          <Input
            value={startTime}
            onChange={onChangeStartTime}
            type="time"
          ></Input>
          <label>종료 시간</label>
          <Input value={endTime} onChange={onChangeEndTime} type="time"></Input>
          <label>마감날짜</label>
          <Input
            value={deadLine}
            onChange={(e) => {
              setDeadLine(e.target.value);
            }}
            type="date"
            role="textbox"
            min={after7days}
          ></Input>

          <Button onClick={onSubmit}>생성하기</Button>
        </AppointmentCreateContainer>
      </PageContent>
    </GroupPage>
  );
};

export default AppointmentCreate;
