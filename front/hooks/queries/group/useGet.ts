import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchGetUserGroups } from "@/apis/user.api";
import { getGroup } from "@/apis/group.api";
import * as GroupType from "@/types/group";
import { ErrorResponse } from "@/types/axios";

const useGetUserGroups = (
  queryOptions?: UseQueryOptions<GroupType.Group[], ErrorResponse>
) => {
  return useQuery<GroupType.Group[], ErrorResponse>(
    ["UserGroups"],
    fetchGetUserGroups,
    {
      useErrorBoundary: true,
      ...queryOptions,
    }
  );
};

const useGetGroup = (
  groupCode: string,
  queryOptions?: UseQueryOptions<GroupType.Group, ErrorResponse>
) => {
  return useQuery<GroupType.Group, ErrorResponse>(
    ["Group", groupCode],
    () => getGroup(groupCode),
    {
      useErrorBoundary: true,
      ...queryOptions,
    }
  );
};

export { useGetUserGroups, useGetGroup };
