import { useGetLoginInfo } from "@/hooks/queries/user/useGet";
import { ErrorResponse } from "@/types/axios";
import { UseQueryOptions } from "@tanstack/react-query";
import * as UserType from "@/types/user";

const useAuth = (
  queryOptions?: UseQueryOptions<UserType.User, ErrorResponse>
) => {
  const getLoginInfo = useGetLoginInfo(queryOptions);
  const isLogin = getLoginInfo.isSuccess && getLoginInfo.data !== null;

  return { getLoginInfo, isLogin };
};

export { useAuth };
