import React from "react";
import Calendar from "@/components/common/calendar";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { useRouter } from "next/router";
import { useGetAppointment } from "@/hooks/queries/appointment/useGet";
import Loading from "@/components/common/loading";
import AppointmentTimePicker from "./components/appointmentTimePicker";
import Button from "@/components/common/button";
import { useCreateAppointmentTimeVote } from "@/hooks/queries/appointment/useCreate";

const AppointmentProgress = () => {
  const [selectedDate, setSelectedDate] = React.useState<string>("");
  const [pickedTimes, setPickedTimes] = React.useState<{
    [key: string]: string[];
  }>({});

  const router = useRouter();

  const { data: Appointment, isLoading } = useGetAppointment(
    router.query.appointmentcode as string,
    {
      enabled:
        router.query.appointmentcode !== undefined &&
        router.query.appointmentcode !== null,
    }
  );

  const {
    mutate: createAppointmentTimeVote,
    isSuccess: createAppointmentItmeVoteSuccess,
  } = useCreateAppointmentTimeVote();

  const handleTimePick = (time: string) => {
    const isIncludeDate = pickedTimes[selectedDate]?.includes(time);

    if (!selectedDate || selectedDate === "") {
      alert("달력에서 날짜를 먼저 선택해주세요!");
      return;
    }

    if (isIncludeDate) {
      setPickedTimes({
        ...pickedTimes,
        [selectedDate]: pickedTimes[selectedDate].filter(
          (pickedTime) => pickedTime !== time
        ),
      });
    }

    if (!isIncludeDate) {
      setPickedTimes({
        ...pickedTimes,
        [selectedDate]: [...(pickedTimes[selectedDate] || []), time],
      });
    }
  };

  const onSubmitTime = () => {
    createAppointmentTimeVote({
      code: router.query.appointmentcode as string,
      pickTimes: pickedTimes,
    });
    console.log(pickedTimes);
  };

  if (isLoading || !Appointment) {
    return <Loading />;
  }

  if (!Appointment) {
    router.push(`/groups/${router.query.groupcode}/appointment`);
  }

  if (Appointment.status !== "진행중") {
    alert("이미 완료된 약속이네요 결과를 확인하세요.");
    router.push(`/groups/${router.query.groupcode}/appointment`);
  }

  if (createAppointmentItmeVoteSuccess) {
    alert("약속 시간을 선택했습니다!");
    router.push(`/groups/${router.query.groupcode}/appointment`);
  }

  return (
    <GroupPage>
      <PageContent>
        <Calendar
          version="select"
          endDate={String(Appointment?.end_date)}
          startDate={String(Appointment?.start_date)}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        ></Calendar>
        {selectedDate && (
          <AppointmentTimePicker
            start_time={Appointment.start_time}
            end_time={Appointment.end_time}
            duration_minutes={Appointment.duration_minutes}
            pickedTimes={pickedTimes}
            handleTimePick={handleTimePick}
            selectedDate={selectedDate}
          />
        )}

        {selectedDate && pickedTimes[selectedDate]?.length > 0 && (
          <Button onClick={onSubmitTime}>선택!</Button>
        )}
      </PageContent>
    </GroupPage>
  );
};

export default AppointmentProgress;
