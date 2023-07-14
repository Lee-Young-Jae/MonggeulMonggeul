import { useMutation, QueryClient } from "@tanstack/react-query";
import { createPoll } from "@/apis/poll.api";
import { Poll, createPollRequest, createPollResponse } from "@/types/poll";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";

const useCreatePoll = (
  mutationOptions?: UseCustomMutationOptions<createPollResponse>
) => {
  const queryClient = new QueryClient();
  return useMutation(createPoll, {
    onSuccess: () => {
      queryClient.invalidateQueries(["UserPolls"]);
    },
    useErrorBoundary: true,
    ...mutationOptions,
  });
};

export { useCreatePoll };
