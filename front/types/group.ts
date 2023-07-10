import { User } from "./user";

type Group = {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  Users: User[];
};

type createGroupRequest = Pick<Group, "name" | "code">;

export type { Group, createGroupRequest };
