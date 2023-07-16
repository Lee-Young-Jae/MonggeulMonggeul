import axiosInstance from "./config/axiosInstance";
import {
  Poll,
  createPollRequest,
  createPollResponse,
  createPollVoteRequest,
  createPollVoteResponse,
} from "@/types/poll";

export const getPolls = async (groupCode: string): Promise<Poll[]> => {
  const response = await axiosInstance.get(`/poll?groupcode=${groupCode}`);
  return response.data;
};

export const createPoll = async (
  createPollRequest: createPollRequest
): Promise<createPollResponse> => {
  const response = await axiosInstance.post(`/poll/create`, {
    ...createPollRequest,
  });
  return response.data;
};

// FIX 반환 타입 수정 필요
export const deletePoll = async (pollId: number): Promise<string> => {
  const response = await axiosInstance.delete(`/poll/delete`, {
    data: { pollId },
  });
  return response.data;
};

export const createPollVote = async ({
  pollCode,
  subjectId,
  comment,
}: createPollVoteRequest): Promise<createPollVoteResponse> => {
  const response = await axiosInstance.post(`/poll/vote`, {
    pollCode,
    subjectId,
    comment,
  });
  return response.data;
};
