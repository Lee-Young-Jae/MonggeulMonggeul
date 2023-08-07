import axiosInstance from "./config/axiosInstance";
import { Appointment } from "@/types/appointment";

export const getAppointments = async (
  groupCode: string
): Promise<Appointment[]> => {
  const response = await axiosInstance.get(
    `/appointment?groupcode=${groupCode}`
  );
  return response.data;
};
