import axiosInstance from "./config/axiosInstance";
import * as GroupType from "@/types/group";

export const createGroup = async (
  groupName: string
): Promise<GroupType.Group> => {
  const response = await axiosInstance.post(`/group/create`, {
    name: groupName,
  });
  return response.data;
};

export const joinGroup = async (
  groupCode: string
): Promise<GroupType.Group> => {
  const response = await axiosInstance.post(`/group/join`, {
    code: groupCode,
  });
  return response.data;
};

export const getGroup = async (groupCode: string): Promise<GroupType.Group> => {
  const response = await axiosInstance.get(`/group/${groupCode}`);
  return response.data;
};

export const leaveGroup = async (
  groupCode: string
): Promise<GroupType.Group> => {
  const response = await axiosInstance.post(`/group/leave`, {
    code: groupCode,
  });
  return response.data;
};

export const generateGroupInviteCode = async ({
  groupCode,
  expireTime,
  expireCount,
}: GroupType.generateGroupInviteCodeRequest): Promise<GroupType.GroupInviteCode> => {
  const response = await axiosInstance.post(`/group/generate/invite-code`, {
    groupCode,
    expireTime,
    expireCount,
  });
  return response.data;
};

export const getGroupInviteCodes = async (
  groupCode: string
): Promise<GroupType.GroupInviteCode[]> => {
  const response = await axiosInstance.get(`/group/invite-code/${groupCode}`);
  return response.data;
};
