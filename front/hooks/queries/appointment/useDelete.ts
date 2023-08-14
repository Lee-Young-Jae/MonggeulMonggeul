import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteAppointment } from "@/apis/appointment.api";
import { Appointment, deleteAppointmentResponse } from "@/types/appointment";
import { UseCustomMutationOptions } from "@/types/axios";
import { queryClient } from "@/apis/config/queryClient";

const useDeleteAppointment = (
  MutationOptions?: UseCustomMutationOptions<deleteAppointmentResponse>
) => {
  return useMutation(deleteAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Appointments"]);
    },
    useErrorBoundary: true,
    ...MutationOptions,
  });
};

export { useDeleteAppointment };
