import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "@/components/common/button";
import AppointmentList from "./components/appointmentList";
import { useGetAppointments } from "@/hooks/queries/appointment/useGet";
import Loading from "@/components/common/loading";

const Appointment = () => {
  const router = useRouter();

  const onClickCreate = () => {
    router.push(`/groups/${router.query.groupcode}/appointment/create`);
  };

  const { data: appointments, isLoading } = useGetAppointments(
    router.query.groupcode as string,
    {
      enabled:
        router.query.groupcode !== undefined && router.query.groupcode !== null,
    }
  );

  if (isLoading) return <Loading></Loading>;

  return (
    <GroupPage>
      <PageContent>
        <div>약속을 잡아보세요</div>
        <Button onClick={onClickCreate}>약속 만들기</Button>
        {appointments !== undefined && (
          <AppointmentList appointments={appointments}></AppointmentList>
        )}
      </PageContent>
    </GroupPage>
  );
};

export default Appointment;
