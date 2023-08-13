import Button from "@/components/common/button";
import { Appointment } from "@/types/appointment";
import { getDateString } from "@/utills/common";
import App from "next/app";
import React from "react";
import styled, { css } from "styled-components";

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

interface IProps {
  appointment: Appointment;
}

const appointmentItem = ({ appointment }: IProps) => {
  return (
    <StyledAppointmentItem>
      <StyledStatusBox status={appointment.status}>
        {appointment.status}
      </StyledStatusBox>
      <div>{appointment.title}</div>
      <div>{appointment.id}</div>
      <div>{appointment.sub_title}</div>
      {/* <div>{appointment.start_date}</div>
      <div>{appointment.end_date}</div> */}
      <div>{appointment.start_time}</div>
      <div>{appointment.end_time}</div>
      <div>{appointment.duration_minutes}</div>
      <div>
        {new Date(appointment.deadline)
          ? getDateString(new Date(appointment.deadline))
          : ""}
      </div>
      {appointment.isHost && <Button color="unimportant">삭제하기</Button>}
    </StyledAppointmentItem>
  );
};

export default appointmentItem;
