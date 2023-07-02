import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchGetUserGroups } from "@/apis/user.api";
import * as GroupType from "@/types/group";
import { ErrorResponse } from "@/types/axios";

const useGetUserGroups = (
  queryOptions?: UseQueryOptions<GroupType.Group[], ErrorResponse>
) => {
  return useQuery<GroupType.Group[], ErrorResponse>(
    ["UserGroups"],
    fetchGetUserGroups,
    queryOptions
  );
};

export { useGetUserGroups };
