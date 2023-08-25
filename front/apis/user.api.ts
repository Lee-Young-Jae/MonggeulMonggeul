import axiosInstance from "./config/axiosInstance";
import * as GroupType from "@/types/group";
import * as UserType from "@/types/user";

export const fetchGetUserGroups = async (): Promise<GroupType.Group[]> => {
  const response = await axiosInstance.get(`/group`);
  return response.data;
};

export const getMyProfile = async (): Promise<UserType.User> => {
  const response = await axiosInstance.get(`/user/profile`);
  return response.data;
};
