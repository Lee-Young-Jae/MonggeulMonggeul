import axiosInstance from "./config/axiosInstance";
import {
  Appointment,
  createAppointmentRequest,
  deleteAppointmentResponse,
  updateAppointmentStatusRequest,
} from "@/types/appointment";

export const getAppointments = async (
  groupCode: string
): Promise<Appointment[]> => {
  const response = await axiosInstance.get(
    `/appointment?groupcode=${groupCode}`
  );
  return response.data;
};

export const getAppointment = async (
  code: Appointment["code"]
): Promise<Appointment> => {
  const response = await axiosInstance.get(`/appointment/${code}`);
  return response.data;
};

export const createAppointment = async (
  createAppointmentRequest: createAppointmentRequest
): Promise<Appointment> => {
  const response = await axiosInstance.post(
    "/appointment",
    createAppointmentRequest
  );
  return response.data;
};

export const deleteAppointment = async (
  code: Appointment["code"]
): Promise<deleteAppointmentResponse> => {
  const response = await axiosInstance.delete(`/appointment/`, {
    data: { code },
  });
  return response.data;
};

export const updateAppointmentStatus = async (
  updateAppointmentStatusRequest: updateAppointmentStatusRequest
): Promise<Appointment> => {
  console.log(updateAppointmentStatusRequest);
  const response = await axiosInstance.put(
    `/appointment/${updateAppointmentStatusRequest.code}`,
    { status: updateAppointmentStatusRequest.status }
  );
  return response.data;
};
