import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {} from "@/apis/user.api";
import { getAppointments } from "@/apis/appointment.api";
import * as AppointmentType from "@/types/appointment";
import { ErrorResponse } from "@/types/axios";

const useGetAppointments = (
  groupCode: string,
  queryOptions?: UseQueryOptions<AppointmentType.Appointment[], ErrorResponse>
) => {
  return useQuery<AppointmentType.Appointment[], ErrorResponse>(
    ["Appointments", groupCode],
    () => getAppointments(groupCode),
    {
      useErrorBoundary: true,
      staleTime: 30000,
      ...queryOptions,
    }
  );
};

export { useGetAppointments };
