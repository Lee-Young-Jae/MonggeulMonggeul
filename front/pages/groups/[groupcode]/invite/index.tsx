import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import ContentBox from "@/components/layout/ContentBox";

import { useRouter } from "next/router";
import SelectBox from "@/components/common/selectBox";
import {
  useGetGroup,
  useGetGroupInviteCodes,
} from "@/hooks/queries/group/useGet";
import Button from "@/components/common/button";
import { useCreateGroupInviteCode } from "@/hooks/queries/group/useCreate";
import InviteCode from "./components/inviteCode";

const StyledTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #666666;
  margin-bottom: 1rem;
`;

const StyledFlexedSelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1rem;

  & > label {
    font-weight: bold;
  }

  & > select {
    width: fit-content;
    font-family: "omyuPretty", sans-serif;
    font-size: 1rem;
  }
`;

const InvitePage = () => {
  const router = useRouter();
  const { groupcode } = router.query;
  const { data: group } = useGetGroup(String(groupcode), {
    enabled: !!groupcode,
  });
  const { mutate: mutateInviteCode } = useCreateGroupInviteCode();
  const { data: inviteCodes } = useGetGroupInviteCodes(groupcode as string, {
    enabled: !!groupcode,
  });

  const [expireTime, setExpireTime] = useState(1);
  const [expireCount, setExpireCount] = useState(1);

  const onClickGenerateCodeBtn = () => {
    mutateInviteCode({
      groupCode: String(groupcode),
      expireTime,
      expireCount,
    });

    alert("코드 생성");
  };

  return (
    <GroupPage>
      <PageContent>
        <ContentBox>
          <StyledTitle>Invite People to {group?.name}</StyledTitle>
          <StyledDescription>
            참가자를 모임에 초대하기 위해 이 코드를 공유해 주세요!
          </StyledDescription>

          <StyledFlexedSelectBox>
            <label>만료 시간</label>
            <SelectBox
              options={new Array(12)
                .fill(0)
                .map((_, i) => ({ value: i + 1, label: `${i + 1}시간` }))}
              onChange={(e) => {
                setExpireTime(Number(e.target.value));
              }}
              value={expireTime}
            />
          </StyledFlexedSelectBox>

          <StyledFlexedSelectBox>
            <label>코드 사용 횟수</label>
            <SelectBox
              options={new Array(10)
                .fill(0)
                .map((_, i) => ({ value: i + 1, label: `${i + 1}회` }))}
              onChange={(e) => {
                setExpireCount(Number(e.target.value));
              }}
              value={expireCount}
            />
          </StyledFlexedSelectBox>

          <Button onClick={onClickGenerateCodeBtn}>코드 생성</Button>
        </ContentBox>
        <ContentBox>
          <StyledTitle>Active Codes</StyledTitle>
          <StyledDescription>
            {inviteCodes?.length === 0
              ? "모임의 활성화된 초대 코드가 없습니다."
              : "모임의 활성화된 초대 코드 목록입니다."}
          </StyledDescription>
          {inviteCodes?.map((inviteCode, index) => (
            <InviteCode
              key={inviteCode.id}
              id={inviteCode.id}
              User={inviteCode.User}
              expiredAt={inviteCode.expiredAt}
              expireCount={inviteCode.expireCount}
              code={inviteCode.code}
              createdAt={inviteCode.createdAt}
              status={inviteCode.status}
            />
          ))}
        </ContentBox>
      </PageContent>
    </GroupPage>
  );
};

export default InvitePage;
