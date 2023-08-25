import { fetchLogout } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

const useUserLogout = () => {
  const logoutMutation = useMutation(fetchLogout, {});
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return handleLogout;
};

export default useUserLogout;
