import axiosInstance from "./config/axiosInstance";
import * as BoardType from "@/types/board";

export const getPosts = async (
  groupCode: string
): Promise<BoardType.Post[]> => {
  const response = await axiosInstance.get(`/post/${groupCode}`);
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
