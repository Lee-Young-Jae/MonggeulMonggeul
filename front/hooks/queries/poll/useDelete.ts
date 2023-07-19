import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePoll } from "@/apis/poll.api";
import { Poll } from "@/types/poll";

const useDeletePoll = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePoll, {
    onSuccess: () => {
      queryClient.invalidateQueries(["polls"]);
    },
  });
};

export { useDeletePoll };
