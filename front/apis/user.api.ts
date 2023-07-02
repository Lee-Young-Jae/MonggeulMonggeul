import axiosInstance from "./config/axiosInstance";
import * as GroupType from "@/types/group";

export const fetchGetUserGroups = async (): Promise<GroupType.Group[]> => {
  const response = await axiosInstance.get(`/group`);
  return response.data;
};
