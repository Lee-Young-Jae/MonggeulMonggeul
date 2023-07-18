import { useGetLoginInfo } from "@/hooks/queries/user/useGet";

const useAuth = () => {
  const getLoginInfo = useGetLoginInfo({ suspense: false });
  const isLogin = getLoginInfo.isSuccess && getLoginInfo.data !== null;

  return { getLoginInfo, isLogin };
};

export { useAuth };
