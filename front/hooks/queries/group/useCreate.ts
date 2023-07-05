import { useMutation, QueryClient } from "@tanstack/react-query";
import { createGroup, joinGroup } from "@/apis/group.api";
import { Group } from "@/types/group";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";

const queryClient = new QueryClient();

const useCreateGroup = (mutationOptions?: UseCustomMutationOptions<Group>) => {
  return useMutation<Group, ErrorResponse, string>(createGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries(["UserGroups"]);
    },
    useErrorBoundary: true,
    ...mutationOptions,
  });
};

const useJoinGroup = (mutationOptions?: UseCustomMutationOptions<Group>) => {
  return useMutation<Group, ErrorResponse, string>(joinGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries(["UserGroups"]);
    },
    useErrorBoundary: true,
    ...mutationOptions,
  });
};

export { useCreateGroup, useJoinGroup };
