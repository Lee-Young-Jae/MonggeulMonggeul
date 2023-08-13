import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { deleteAppointment } from "@/apis/appointment.api";
import * as AppointmentType from "@/types/appointment";
import { ErrorResponse } from "@/types/axios";

const useDeleteAppointment = (
  code: AppointmentType.Appointment["code"],
  queryOptions?: UseQueryOptions<void, ErrorResponse>
) => {
  return useQuery<void, ErrorResponse>(
    ["Appointment", code],
    () => deleteAppointment(code),
    {
      useErrorBoundary: true,
      ...queryOptions,
    }
  );
};

export { useDeleteAppointment };
