import { useMutation, QueryClient } from "@tanstack/react-query";
import { createAppointment } from "@/apis/appointment.api";
import { Appointment, createAppointmentRequest } from "@/types/appointment";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";

const queryClient = new QueryClient();

const useCreateAppointment = (
  mutationOptions?: UseCustomMutationOptions<Appointment>
) => {
  return useMutation<Appointment, ErrorResponse, createAppointmentRequest>(
    createAppointment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Appointments"]);
      },
      useErrorBoundary: true,
      ...mutationOptions,
    }
  );
};

export { useCreateAppointment };
