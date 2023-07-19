import { useQuery, QueryClient, UseQueryOptions } from "@tanstack/react-query";
import { getPoll, getPolls } from "@/apis/poll.api";
import { ErrorResponse } from "@/types/axios";
import { Poll } from "@/types/poll";

export const useGetPolls = (
  groupCode: string,
  queryOptions?: UseQueryOptions<Poll[], ErrorResponse>
) => {
  const queryClient = new QueryClient();
  queryClient.invalidateQueries(["polls", groupCode]);
  return useQuery<Poll[], ErrorResponse>(
    ["polls", groupCode],
    () => getPolls(groupCode),
    {
      useErrorBoundary: true,
      staleTime: 30000,
      ...queryOptions,
    }
  );
};

export const useGetPoll = (
  pollCode: string,
  queryOptions?: UseQueryOptions<Poll, ErrorResponse>
) => {
  const queryClient = new QueryClient();
  queryClient.invalidateQueries(["poll", pollCode]);
  return useQuery<Poll, ErrorResponse>(
    ["poll", pollCode],
    () => getPoll(pollCode),
    {
      useErrorBoundary: true,
      staleTime: 30000,
      ...queryOptions,
    }
  );
};
