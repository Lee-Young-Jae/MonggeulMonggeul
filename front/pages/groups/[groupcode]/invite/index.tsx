import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import ContentBox from "@/components/layout/ContentBox";

import { useRouter } from "next/router";
import SelectBox from "@/components/common/selectBox";
import { useGetGroup } from "@/hooks/queries/group/useGet";

const StyledInviteTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledInviteDescription = styled.p`
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

const StyledInviteCode = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #000000;
  background-color: #ffffff;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #f8c6d2;

  cursor: pointer;

  &:hover {
    background: linear-gradient(
      40deg,
      rgba(244, 53, 108, 0.01) 0%,
      rgba(255, 0, 0, 0.03) 50%,
      rgba(255, 154, 0, 0.01) 100%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

const InvitePage = () => {
  const router = useRouter();
  const { groupcode } = router.query;
  const { data: group } = useGetGroup(String(groupcode), {
    enabled: !!groupcode,
  });

  const [expireTime, setExpireTime] = useState(1);
  const [expireCount, setExpireCount] = useState(1);

  return (
    <GroupPage>
      <PageContent>
        <ContentBox>
          <StyledInviteTitle>Invite People to {group?.name}</StyledInviteTitle>
          <StyledInviteDescription>
            참가자를 모임에 초대하기 위해 이 코드를 공유해 주세요!
          </StyledInviteDescription>

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

          <StyledInviteCode>{group?.code}</StyledInviteCode>
        </ContentBox>
      </PageContent>
    </GroupPage>
  );
};

export default InvitePage;
