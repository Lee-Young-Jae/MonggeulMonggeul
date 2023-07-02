import { useGetUserGroups } from "@/hooks/queries/group/useGet";

const useGetUserInfo = () => {
  const getUserGroups = useGetUserGroups();
  const userGroups = getUserGroups.data ?? [];

  return { getUserGroups, userGroups };
};

export default useGetUserInfo;
