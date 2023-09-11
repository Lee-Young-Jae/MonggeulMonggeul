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
  Comments: Comment[];
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

export type { Post, Comment, createPostRequest };
