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
  comment?: string | "";
};

type createPollVoteResponse = {
  message: string;
  Vote: Vote;
};

export type {
  Poll,
  createPollRequest,
  createPollResponse,
  createPollVoteRequest,
  createPollVoteResponse,
  Vote,
  subject,
};
