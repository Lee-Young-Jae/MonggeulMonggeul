import { useMutation } from "@tanstack/react-query";
import { createComment, createPost } from "@/apis/board.api";
import { ErrorResponse, UseCustomMutationOptions } from "@/types/axios";
import {
  Post,
  createCommentRequest,
  createPostRequest,
  Comment,
} from "@/types/board";
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

const useCreateComment = (
  mutationOptions?: UseCustomMutationOptions<Comment>
) => {
  return useMutation<Comment, ErrorResponse, createCommentRequest>(
    createComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["GroupPosts"]);
      },
      useErrorBoundary: true,
      ...mutationOptions,
    }
  );
};

export { useCreatePost, useCreateComment };
