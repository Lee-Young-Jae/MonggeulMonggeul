import React from "react";
import Calendar from "@/components/common/calendar";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { useRouter } from "next/router";
import { useGetAppointment } from "@/hooks/queries/appointment/useGet";
import Loading from "@/components/common/loading";
import AppointmentTimePicker from "./components/appointmentTimePicker";
import Button from "@/components/common/button";

const AppointmentProgress = () => {
  const [selectedDate, setSelectedDate] = React.useState<string>("");
  const [pickedTimes, setPickedTimes] = React.useState<{
    [key: string]: string[];
  }>({}); // {
  //   "2021-10-01": ["10:00", "11:00"],
  //   "2021-10-02": ["10:00", "11:00"],
  // }

  const router = useRouter();

  const { data: Appointment, isLoading } = useGetAppointment(
    router.query.appointmentcode as string,
    {
      enabled:
        router.query.appointmentcode !== undefined &&
        router.query.appointmentcode !== null,
    }
  );

  const handleTimePick = (time: string) => {
    const isTimePicked = pickedTimes[selectedDate]?.includes(time);

    if (isTimePicked) {
      setPickedTimes({
        ...pickedTimes,
        [selectedDate]: pickedTimes[selectedDate].filter(
          (pickedTime) => pickedTime !== time
        ),
      });
    }

    if (!isTimePicked) {
      setPickedTimes({
        ...pickedTimes,
        [selectedDate]: [...(pickedTimes[selectedDate] || []), time],
      });
    }
  };

  if (isLoading || !Appointment) {
    return <Loading />;
  }

  if (!Appointment) {
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
        <br />
        <AppointmentTimePicker
          start_time={Appointment.start_time}
          end_time={Appointment.end_time}
          duration_minutes={Appointment.duration_minutes}
          pickedTimes={pickedTimes}
          handleTimePick={handleTimePick}
          selectedDate={selectedDate}
        ></AppointmentTimePicker>
        <Button
          onClick={() => {
            console.log(pickedTimes);
          }}
        >
          선택!
        </Button>
      </PageContent>
    </GroupPage>
  );
};

export default AppointmentProgress;
