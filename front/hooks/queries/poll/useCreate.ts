import { useMutation, QueryClient } from "@tanstack/react-query";
import {
  createPoll,
  createPollVote,
  createPollVoteMultiple,
} from "@/apis/poll.api";
import {
  Poll,
  createPollResponse,
  createPollVoteMultipleRequest,
  createPollVoteResponse,
  createPollVoteMultipleResponse,
} from "@/types/poll";
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
  const queryClient = new QueryClient();
  return useMutation(createPollVote, {
    useErrorBoundary: true,
    ...mutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries(["poll"]);
    },
  });
};

const useCreatePollVoteMultiple = (
  mutationOptions?: UseCustomMutationOptions<createPollVoteMultipleResponse>
) => {
  const queryClient = new QueryClient();
  return useMutation(createPollVoteMultiple, {
    useErrorBoundary: true,
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["poll", data.code]);
    },
  });
};

export { useCreatePoll, useCreatePollVote, useCreatePollVoteMultiple };
