import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/common/useAuth";
import Loading from "@/components/common/loading";
import { useGetUserGroups } from "@/hooks/queries/group/useGet";

const AuthPage = () => {
  const router = useRouter();
  const { isLogin, getLoginInfo } = useAuth();
  const { isLoading: isLoginLoading } = getLoginInfo;
  const { data: groups, isSuccess: isGetGroupsSuccess } = useGetUserGroups();

  useEffect(() => {
    if (isLogin && isGetGroupsSuccess) {
      const userGroups = groups ?? [];

      if (!isLogin && !isLoginLoading) {
        router.push("/");
      } else if (isLogin && userGroups?.length > 0) {
        router.push(`/groups/${userGroups[0].code}`, undefined, {
          shallow: true,
        });
      } else if (isLogin && userGroups.length === 0) {
        router.push("/groups", undefined, { shallow: true });
      }
    } else {
      console.log("로딩중...");
    }
  }, [isLogin, router, isLoginLoading, groups, isGetGroupsSuccess]);

  return (
    <>
      <Loading></Loading>
    </>
  );
};

export default AuthPage;
