import { useQuery } from "@tanstack/react-query";
import {} from "@/apis/user.api";
import { getAppointments } from "@/apis/appointment.api";
import * as AppointmentType from "@/types/appointment";

const useGetAppointments = (groupCode: string) => {
  return useQuery<AppointmentType.Appointment[]>(
    ["Appointments", groupCode],
    () => getAppointments(groupCode),
    {
      useErrorBoundary: true,
      staleTime: 30000,
    }
  );
};

export { useGetAppointments };
