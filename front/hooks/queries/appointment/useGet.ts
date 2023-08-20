import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {} from "@/apis/user.api";
import {
  getAppointment,
  getAppointmentTimeVotesRanking,
  getAppointments,
} from "@/apis/appointment.api";
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

const useGetAppointment = (
  code: AppointmentType.Appointment["code"],
  queryOptions?: UseQueryOptions<AppointmentType.Appointment, ErrorResponse>
) => {
  return useQuery<AppointmentType.Appointment, ErrorResponse>(
    ["Appointment", code],
    () => getAppointment(code),
    {
      useErrorBoundary: true,
      staleTime: 30000,
      ...queryOptions,
    }
  );
};

const useGetAppointmentTimeVotesRanking = (
  code: AppointmentType.Appointment["code"],
  queryOptions?: UseQueryOptions<
    AppointmentType.AppointmentTimeVotesRankingResponse,
    ErrorResponse
  >
) => {
  return useQuery<
    AppointmentType.AppointmentTimeVotesRankingResponse,
    ErrorResponse
  >(
    ["AppointmentTimeVotesRanking", code],
    () => getAppointmentTimeVotesRanking(code),
    {
      useErrorBoundary: true,
      staleTime: 30000,
      ...queryOptions,
    }
  );
};

export {
  useGetAppointments,
  useGetAppointment,
  useGetAppointmentTimeVotesRanking,
};
