import { useMutation } from "@tanstack/react-query";
import {
  createGroup,
  joinGroup,
  generateGroupInviteCode,
} from "@/apis/group.api";
import {
  Group,
  GroupInviteCode,
  generateGroupInviteCodeRequest,
} from "@/types/group";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";
import { queryClient } from "@/apis/config/queryClient";

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

const useCreateGroupInviteCode = (
  mutationOptions?: UseCustomMutationOptions<GroupInviteCode>
) => {
  return useMutation<
    GroupInviteCode,
    ErrorResponse,
    generateGroupInviteCodeRequest
  >(generateGroupInviteCode, {
    onSuccess: () => {
      queryClient.invalidateQueries(["GroupInviteCodes"]);
    },
    useErrorBoundary: true,
    ...mutationOptions,
  });
};

export { useCreateGroup, useJoinGroup, useCreateGroupInviteCode };
