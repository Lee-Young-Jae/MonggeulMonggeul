import { Group } from "./group";
import { User } from "./user";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User: User;
  GroupId: number;
  Group: Group;
  PostComments: Comment[];
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User: User;
  PostId: number;
  Post: Post;
};

type createPostRequest = Pick<Post, "title" | "content"> & {
  groupCode: string;
};

type createCommentRequest = Pick<Comment, "content"> & {
  postId: number;
};

export type { Post, Comment, createPostRequest, createCommentRequest };
