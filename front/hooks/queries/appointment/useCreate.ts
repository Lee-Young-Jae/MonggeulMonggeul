import { useMutation, QueryClient } from "@tanstack/react-query";
import {
  createAppointment,
  createAppointmentTimeVote,
} from "@/apis/appointment.api";
import {
  Appointment,
  AppointmentTimeVote,
  createAppointmentRequest,
  createAppointmentTimeVoteRequest,
} from "@/types/appointment";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";
import { queryClient } from "@/apis/config/queryClient";

const useCreateAppointment = (
  mutationOptions?: UseCustomMutationOptions<Appointment>
) => {
  return useMutation<Appointment, ErrorResponse, createAppointmentRequest>(
    createAppointment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Appointments"]);
      },
      ...mutationOptions,
    }
  );
};
const useCreateAppointmentTimeVote = (
  mutationOptions?: UseCustomMutationOptions<AppointmentTimeVote>
) => {
  return useMutation<
    AppointmentTimeVote,
    ErrorResponse,
    createAppointmentTimeVoteRequest
  >(createAppointmentTimeVote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["AppointmentTimeVotesRanking"]);
    },
    ...mutationOptions,
  });
};

export { useCreateAppointment, useCreateAppointmentTimeVote };
