import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/apis/board.api";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";
import { Post, createPostRequest } from "@/types/board";
import { queryClient } from "@/apis/config/queryClient";

const useCreatePost = (mutationOptions?: UseCustomMutationOptions<Post>) => {
  return useMutation<Post, ErrorResponse, createPostRequest>(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["GroupPosts"]);
    },
    useErrorBoundary: true,
    ...mutationOptions,
  });
};

export { useCreatePost };
