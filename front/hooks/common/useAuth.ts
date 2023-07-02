import { useGetLoginInfo } from "@/hooks/queries/user/useGet";
import { get } from "http";

const useAuth = () => {
  const getLoginInfo = useGetLoginInfo({ suspense: false });
  const isLogin = getLoginInfo.isSuccess && getLoginInfo.data !== null;

  return { getLoginInfo, isLogin };
};

export default useAuth;
