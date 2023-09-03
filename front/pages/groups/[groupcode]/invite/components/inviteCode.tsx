import { GroupInviteCode } from "@/types/group";
import { getRemainTime } from "@/utills/common";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import copy from "copy-to-clipboard";
const StyledInviteCodeWrapper = styled.div`
  border-radius: 14px;
  border: 1px solid #f8c6d2;
  padding: 1rem;
  margin-bottom: 1rem;

  & > p {
    font-size: 0.8rem;
    color: #666666;

    text-align: right;
  }
`;

const StyledUserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    font-size: 1rem;
    font-weight: bold;
  }

  & > img {
    margin-left: 0.5rem;
    border-radius: 50%;
  }
`;

const StyledInviteCode = styled.div`
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #000000;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0.5rem 1rem;

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

const InviteCode = ({
  id,
  User,
  code,
  createdAt,
  expiredAt,
  status,
  expireCount,
}: GroupInviteCode) => {
  const onClickCopyCode = () => {
    copy(code);
    alert("초대 코드가 클립보드에 복사되었습니다.");
  };

  return (
    <StyledInviteCodeWrapper>
      <StyledUserProfile>
        <span>{User?.name}</span>
        <Image
          width={30}
          height={30}
          src={User?.profileImage}
          alt={`${User?.name}의 프로필 이미지`}
        />
      </StyledUserProfile>
      <StyledInviteCode onClick={onClickCopyCode}>{code}</StyledInviteCode>
      <p>{getRemainTime(new Date(expiredAt))}남음</p>
      <p>{expireCount}회 사용 가능</p>
    </StyledInviteCodeWrapper>
  );
};

export default InviteCode;
