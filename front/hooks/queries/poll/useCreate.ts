import { useMutation, QueryClient } from "@tanstack/react-query";
import { createPoll, createPollVote } from "@/apis/poll.api";
import { Poll, createPollResponse, createPollVoteResponse } from "@/types/poll";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";

const useCreatePoll = (
  mutationOptions?: UseCustomMutationOptions<createPollResponse>
) => {
  // const queryClient = new QueryClient();
  return useMutation(createPoll, {
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["UserPolls"]);
    // },
    useErrorBoundary: true,
    ...mutationOptions,
  });
};

const useCreatePollVote = (
  mutationOptions?: UseCustomMutationOptions<createPollVoteResponse>
) => {
  return useMutation(createPollVote, {
    useErrorBoundary: true,
    ...mutationOptions,
  });
};

export { useCreatePoll, useCreatePollVote };
