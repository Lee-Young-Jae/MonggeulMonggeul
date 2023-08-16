import { useMutation } from "@tanstack/react-query";
import { updateAppointmentStatus } from "@/apis/appointment.api";
import {
  Appointment,
  updateAppointmentStatusRequest,
} from "@/types/appointment";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";
import { queryClient } from "@/apis/config/queryClient";

const useUpdateAppointmentStatus = (
  MutationOptions?: UseCustomMutationOptions<Appointment>
) => {
  return useMutation<
    Appointment,
    ErrorResponse,
    updateAppointmentStatusRequest
  >(updateAppointmentStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Appointments"]);
    },
    useErrorBoundary: true,
    ...MutationOptions,
  });
};

export { useUpdateAppointmentStatus };
