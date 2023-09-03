import { User } from "./user";

type Group = {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  Users: User[];
};

type createGroupRequest = Pick<Group, "name" | "code">;

type GroupInviteCode = {
  id: number;
  code: string;
  expiredAt: string;
  status: string;
  createdAt: string;
  expireCount: number;
  User: User;
};

type generateGroupInviteCodeRequest = {
  groupCode: string;
  expireTime: number;
  expireCount: number;
};

export type {
  Group,
  createGroupRequest,
  GroupInviteCode,
  generateGroupInviteCodeRequest,
};
