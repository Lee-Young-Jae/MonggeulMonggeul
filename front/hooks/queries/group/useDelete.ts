import {
  MutationOptions,
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { leaveGroup } from "@/apis/group.api";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";
import { Group } from "@/types/group";

export const useLeaveGroup = (
  MutationOptions?: UseCustomMutationOptions<Group>
) => {
  const queryClient = useQueryClient();
  // return 결과는 message와 code를 가진다.
  return useMutation<Group, ErrorResponse, string>(leaveGroup, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Group", data.code]);
    },
    ...MutationOptions,
  });
};
