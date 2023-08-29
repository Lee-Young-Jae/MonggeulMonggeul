import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchGetLoginInfo, fetchLogin } from "@/apis/auth";
import { getMyProfile } from "@/apis/user.api";
import * as UserType from "@/types/user";
import { ErrorResponse } from "@/types/axios";

const LoginInfoKey = ["loginInfo"];

const useGetKakaoAuth = (
  queryOptions?: UseQueryOptions<string, ErrorResponse>
) => {
  return useQuery<string, ErrorResponse>(
    LoginInfoKey,
    () => fetchLogin(),
    queryOptions
  );
};

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

export { useGetLoginInfo, LoginInfoKey, useGetMyProfile, useGetKakaoAuth };
