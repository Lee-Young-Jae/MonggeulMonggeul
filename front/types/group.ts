type Group = {
  id: number;
  name: string;
  code: string;
  createdAt: string;
};

type createGroupRequest = Pick<Group, "name" | "code">;

export type { Group, createGroupRequest };
