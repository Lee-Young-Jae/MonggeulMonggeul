import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "@/components/common/button";

const Appointment = () => {
  const router = useRouter();

  const onClickCreate = () => {
    router.push(`/groups/${router.query.groupcode}/appointment/create`);
  };
  return (
    <GroupPage>
      <PageContent>
        <div>약속을 잡아보세요</div>
        <Button onClick={onClickCreate}>약속 만들기</Button>
      </PageContent>
    </GroupPage>
  );
};

export default Appointment;
