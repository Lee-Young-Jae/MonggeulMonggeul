import React, { useRef } from "react";
import Button from "@/components/common/button";
import { Appointment } from "@/types/appointment";
import { getDateString } from "@/utills/common";
import styled, { css } from "styled-components";
import { useDeleteAppointment } from "@/hooks/queries/appointment/useDelete";
import Loading from "@/components/common/loading";
import { useRouter } from "next/router";
import { formatMinute } from "@/utills/common";
import { useUpdateAppointmentStatus } from "@/hooks/queries/appointment/useUpdate";

const StyledAppointmentItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const StyledStatusBox = styled.div<{ status: Appointment["status"] }>`
  width: fit-content;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #e0e0e0;
  margin-left: auto;

  ${(props) =>
    props.status === "진행중" &&
    css`
      background-color: #f4356c;
      color: white;
    `}

  ${(props) =>
    props.status === "완료" &&
    css`
      background-color: #e0e0e0;
      color: white;
    `}
`;

const StyledTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledSubTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
`;

const StyledDeadline = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: #828282;
`;

interface IProps {
  appointment: Appointment;
}

const AppointmentItem = ({ appointment }: IProps) => {
  const { mutate: deleteAppointment } = useDeleteAppointment();
  const { mutate: upDateApointmentStatus } = useUpdateAppointmentStatus();

  const router = useRouter();
  const onClickSelect = () => {
    router.push(
      `/groups/${router.query.groupcode}/appointment/${appointment.code}/progress`
    );
  };

  const onClickViewResult = () => {
    router.push(
      `/groups/${router.query.groupcode}/appointment/${appointment.code}/rank`
    );
  };

  const onClickDelete = () => {
    deleteAppointment(appointment.code);
  };

  const today = new Date();
  const isExpired = new Date(appointment?.deadline) < today;
  const isRequesting = useRef(false);
  if (isExpired && !isRequesting.current && appointment.status !== "완료") {
    upDateApointmentStatus({
      code: appointment.code,
      status: "완료",
    });
    isRequesting.current = true;
  }
  if (!appointment) return <Loading />;

  return (
    <StyledAppointmentItem>
      <StyledStatusBox status={appointment.status}>
        {appointment.status}
      </StyledStatusBox>
      <StyledTitle>{appointment.title}</StyledTitle>
      <StyledSubTitle>{appointment.sub_title}</StyledSubTitle>

      <div>{formatMinute(appointment.duration_minutes)}</div>
      <StyledDeadline>
        {new Date(appointment.deadline)
          ? getDateString(new Date(appointment.deadline))
          : ""}
        까지
      </StyledDeadline>
      <Button onClick={onClickSelect}>선택하기</Button>
      <Button onClick={onClickViewResult}>결과보기</Button>
      {appointment.isHost && (
        <Button color="unimportant" onClick={onClickDelete}>
          삭제하기
        </Button>
      )}
    </StyledAppointmentItem>
  );
};

export default AppointmentItem;
