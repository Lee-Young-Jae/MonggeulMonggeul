import { useMutation } from "@tanstack/react-query";
import { deletePoll } from "@/apis/poll.api";
import { Poll } from "@/types/poll";
import { queryClient } from "@/apis/config/queryClient";

const useDeletePoll = () => {
  return useMutation(deletePoll, {
    onSuccess: () => {
      queryClient.invalidateQueries(["polls"]);
    },
  });
};

export { useDeletePoll };
