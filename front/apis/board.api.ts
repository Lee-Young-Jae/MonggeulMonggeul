import axiosInstance from "./config/axiosInstance";
import * as BoardType from "@/types/board";

export const getPosts = async (
  groupCode: string,
  page: number,
  limit: number
): Promise<BoardType.Post[]> => {
  const response = await axiosInstance.get(
    `/post/${groupCode}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const createPost = async ({
  title,
  content,
  groupCode,
}: BoardType.createPostRequest): Promise<BoardType.Post> => {
  const response = await axiosInstance.post(`/post`, {
    title,
    content,
    groupCode,
  });
  return response.data;
};

export const createComment = async ({
  postId,
  content,
}: BoardType.createCommentRequest): Promise<BoardType.Comment> => {
  const response = await axiosInstance.post(`/post/${postId}/comment`, {
    content,
  });
  return response.data;
};
