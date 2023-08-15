import React from "react";
import styled from "styled-components";
import AppointmentItem from "./appointmentItem";
import { Appointment } from "@/types/appointment";
import { User } from "@/types/user";

const StyledAppointmentList = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

interface IProps {
  appointments: Appointment[];
}

const AppointmentList = ({ appointments }: IProps) => {
  return (
    <StyledAppointmentList>
      {appointments?.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
        ></AppointmentItem>
      ))}
    </StyledAppointmentList>
  );
};

export default AppointmentList;
