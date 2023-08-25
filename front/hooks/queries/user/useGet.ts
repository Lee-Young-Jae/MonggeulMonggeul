import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchGetLoginInfo } from "@/apis/auth";
import { getMyProfile } from "@/apis/user.api";
import * as UserType from "@/types/user";
import { ErrorResponse } from "@/types/axios";

const LoginInfoKey = ["loginInfo"];
const useGetLoginInfo = (
  queryOptions?: UseQueryOptions<UserType.User, ErrorResponse>
) => {
  return useQuery<UserType.User, ErrorResponse>(
    LoginInfoKey,
    fetchGetLoginInfo,
    queryOptions
  );
};

const useGetMyProfile = (
  queryOptions?: UseQueryOptions<UserType.User, ErrorResponse>
) => {
  return useQuery<UserType.User, ErrorResponse>(
    ["myProfile"],
    getMyProfile,
    queryOptions
  );
};

export { useGetLoginInfo, LoginInfoKey, useGetMyProfile };
