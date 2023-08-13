import React, { useState, useRef } from "react";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import styled from "styled-components";
import Calendar from "@/components/common/calendar";
import { useCreateAppointment } from "@/hooks/queries/appointment/useCreate";
import useInput from "@/hooks/common/useInput";
import { useRouter } from "next/router";
import Input from "@/components/common/Input";
import Button from "@/components/common/button";
import SelectBox from "@/components/common/selectBox";
import { QueryClient } from "@tanstack/react-query";

const AppointmentCreateContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 2rem;
`;

const DurationContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  border: 1px solid #f8c6d2;
  border-radius: 14px;
`;

const AppointmentSubTitle = styled.label`
  display: inline-block;
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const now_utc = Date.now();
const timeOff = new Date().getTimezoneOffset() * 60000;
const after7days = new Date(now_utc - timeOff + 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split(".")[0];

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

  const { mutate: createAppointment } = useCreateAppointment({
    onSuccess: () => {
      const queryClient = new QueryClient();
      queryClient.invalidateQueries(["Appointments"]);
      alert("약속이 생성되었습니다");
      router.push(`/groups/${router.query.groupcode}/appointment`);
    },
  });

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

    // TODO: 종료 시간은 항상 시작 시간보다 늦어야 함
    /**
     *  1. 만약 시작 시간이 오후 11시 종료 시간이 오전 1시라면 종료 시간은 다음날이라고 가정
     *
     */

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

    // 진행 시간이 종료시간 - 시작시간 보다 길면 안됨
    // 임의의 2000년 1월 1일을 기준으로 시작시간과 종료시간을 비교
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    const diffStartEnd = end.getTime() - start.getTime();
    const durationTime =
      duration.hours * 60 * 60 * 1000 + duration.minutes * 60 * 1000;

    if (diffStartEnd < durationTime) {
      alert("진행 시간이 종료 시간 - 시작 시간보다 길 수 없습니다");
      return;
    }

    if (duration.hours === 0 && duration.minutes === 0) {
      alert("진행 시간을 설정해주세요");
      return;
    }

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
          <AppointmentSubTitle>제목</AppointmentSubTitle>
          <Input value={title} onChange={onChangeTitle}></Input>
          <AppointmentSubTitle>부제목</AppointmentSubTitle>
          <Input value={subTitle} onChange={onChangeSubTitle}></Input>
          <AppointmentSubTitle>진행 시간 설정</AppointmentSubTitle>
          <DurationContainer>
            <SelectBoxWrapper>
              <SelectBox<number>
                value={duration.hours}
                onChange={(e) => {
                  setDuration({ ...duration, hours: ~~e.target.value });
                }}
                options={new Array(23).fill(0).map((_, index) => index)}
              ></SelectBox>
            </SelectBoxWrapper>
            <p>시간</p>
            <SelectBoxWrapper>
              <SelectBox<number>
                value={duration.minutes}
                onChange={(e) => {
                  setDuration({ ...duration, minutes: ~~e.target.value });
                }}
                options={[0, 30]}
              ></SelectBox>
            </SelectBoxWrapper>
            <p>분 동안</p>
          </DurationContainer>

          <AppointmentSubTitle>시작 시간</AppointmentSubTitle>
          <Input
            value={startTime}
            onChange={onChangeStartTime}
            type="time"
          ></Input>
          <AppointmentSubTitle>종료 시간</AppointmentSubTitle>
          <Input value={endTime} onChange={onChangeEndTime} type="time"></Input>
          <AppointmentSubTitle>마감날짜</AppointmentSubTitle>

          <Input
            value={deadLine}
            onChange={(e) => {
              setDeadLine(e.target.value);
            }}
            type="datetime-local"
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
