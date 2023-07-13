type Poll = {
  id: number;
  title: string;
  isAnonymous: boolean;
  isMultiple: boolean;
  subjects: subject[];
  createdAt: string;
  closedAt: string;
};

type subject = {
  id: number;
  title: string;
  PollId: number;
};

type createPollRequest = Pick<
  Poll,
  "title" | "isAnonymous" | "isMultiple" | "closedAt" | "subjects"
> & {
  groupCode: string;
};

type createPollResponse = Poll & {
  groupCode: string;
  message: string;
};

export type { Poll, createPollRequest, createPollResponse };
