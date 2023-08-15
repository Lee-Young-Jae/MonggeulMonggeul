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
import { queryClient } from "@/apis/config/queryClient";

const useCreatePoll = (
  mutationOptions?: UseCustomMutationOptions<createPollResponse>
) => {
  return useMutation(createPoll, {
    onSuccess: () => {
      queryClient.invalidateQueries(["polls"]);
    },
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
    onSuccess: () => {
      queryClient.invalidateQueries(["poll"]);
    },
  });
};

const useCreatePollVoteMultiple = (
  mutationOptions?: UseCustomMutationOptions<createPollVoteMultipleResponse>
) => {
  return useMutation(createPollVoteMultiple, {
    useErrorBoundary: true,
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["poll", data.code]);
    },
  });
};

export { useCreatePoll, useCreatePollVote, useCreatePollVoteMultiple };
