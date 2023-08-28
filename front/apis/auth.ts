import axiosInstance from "./config/axiosInstance";
import * as UserType from "@/types/user";

export const fetchGetLoginInfo = async (): Promise<UserType.User> => {
  const response = await axiosInstance.get("/auth");

  console.log("response.data", response.data);

  return response.data;
};

export const fetchLogout = async () => {
  const response = await axiosInstance.get("/auth/kakao/logout");
  return response.data;
};
