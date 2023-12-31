import { User } from "./user";

type Poll = {
  id: number;
  title: string;
  isAnonymous: boolean;
  isMultiple: boolean;
  PollSubjects: subject[];
  createdAt: string;
  closedAt: string;
  code: string;
  isVoted: boolean;
};

type subject = {
  id: number;
  title: string;
  Votes: Vote[];
};

type Vote = {
  id: number;
  isAgree: boolean;
  comment: string;
  createdAt: string;
  UserId: number;
  PollSubjectId: number;
  User: User;
};

type createPollRequest = Pick<
  Poll,
  "title" | "isAnonymous" | "isMultiple" | "closedAt"
> & {
  subjects: string[];
  groupCode: string;
};

type createPollResponse = Poll & {
  groupCode: string;
  message: string;
};

type createPollVoteRequest = {
  subjectId: number;
  comment?: string | "" | null;
};

type createPollVoteResponse = {
  message: string;
  Vote: Vote;
};

type createPollVoteMultipleRequest = {
  subjectIds: number[];
  comments: string[];
};

type createPollVoteMultipleResponse = {
  GroupId: number;
  PollSubjects: subject[];
  closedAt: string;
  code: string;
  createdAt: string;
  id: number;
  isAnonymous: boolean;
  isMultiple: boolean;
  title: string;
};

export type {
  Poll,
  createPollRequest,
  createPollResponse,
  createPollVoteRequest,
  createPollVoteResponse,
  createPollVoteMultipleRequest,
  createPollVoteMultipleResponse,
  Vote,
  subject,
};
