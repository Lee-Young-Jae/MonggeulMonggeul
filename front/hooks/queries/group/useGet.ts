import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchGetUserGroups } from "@/apis/user.api";
import { getGroup, getGroupInviteCodes } from "@/apis/group.api";
import * as GroupType from "@/types/group";
import { ErrorResponse } from "@/types/axios";
import { queryClient } from "@/apis/config/queryClient";

const useGetUserGroups = (
  queryOptions?: UseQueryOptions<GroupType.Group[], ErrorResponse>
) => {
  return useQuery<GroupType.Group[], ErrorResponse>(
    ["UserGroups"],
    fetchGetUserGroups,
    {
      useErrorBoundary: true,
      // staleTime: 60000,
      ...queryOptions,
    }
  );
};

const useGetGroup = (
  groupCode: string,
  queryOptions?: UseQueryOptions<GroupType.Group, ErrorResponse>
) => {
  queryClient.invalidateQueries(["Group", groupCode]);

  return useQuery<GroupType.Group, ErrorResponse>(
    ["Group", groupCode],
    () => getGroup(groupCode),
    {
      useErrorBoundary: true,
      staleTime: 30000,
      ...queryOptions,
    }
  );
};

const useGetGroupInviteCodes = (
  groupCode: string,
  queryOptions?: UseQueryOptions<GroupType.GroupInviteCode[], ErrorResponse>
) => {
  return useQuery<GroupType.GroupInviteCode[], ErrorResponse>(
    ["GroupInviteCodes", groupCode],
    () => getGroupInviteCodes(groupCode),
    {
      useErrorBoundary: true,
      staleTime: 30000,
      ...queryOptions,
    }
  );
};

export { useGetUserGroups, useGetGroup, useGetGroupInviteCodes };
