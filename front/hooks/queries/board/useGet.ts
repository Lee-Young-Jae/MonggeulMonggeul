import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPosts } from "@/apis/board.api";
import { ErrorResponse } from "@/types/axios";
import { Post } from "@/types/board";

const useGetGroupPosts = (
  groupCode: string,
  page: number,
  limit: number,
  options?: UseQueryOptions<Post[], ErrorResponse>
) => {
  return useQuery<Post[], ErrorResponse>(
    ["GroupPosts", groupCode],
    () => getPosts(groupCode, page, limit),
    {
      ...options,
    }
  );
};

export { useGetGroupPosts };
