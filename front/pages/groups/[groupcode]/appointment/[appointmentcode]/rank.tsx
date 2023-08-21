import {
  useGetAppointment,
  useGetAppointmentTimeVotesRanking,
} from "@/hooks/queries/appointment/useGet";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import { addMinute, getDateString } from "@/utills/common";
import Loading from "@/components/common/loading";
import { AppointmentTimeVotesRanking } from "@/types/appointment";
import { User } from "@/types/user";
import Image from "next/image";
import Button from "@/components/common/button";

const StyledAppointmentTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const StyledDeadline = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: #828282;
`;

const StyledAppointmentVoteRankTimes = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const StyledAppointmentVoteRankList = styled.div`
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  width: 100%;
`;

const StyledAppointmentVoteRankItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  background-color: white;
  box-sizing: border-box;
  border-radius: 14px;
  border: 1px solid #e0e0e0;
  padding: 10px;
  cursor: pointer;
`;

const StyledUserProfileImage = styled(Image)`
  border-radius: 50%;
`;

const StyledUserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    font-size: 14px;
    margin-top: 5px;
  }
`;

const StyledUserProfileList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  background-color: white;
  box-sizing: border-box;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
  padding: 16px;
`;

const AppointmentRank = () => {
  const router = useRouter();

  const [voteUsers, setVoteUsers] = useState<Exclude<User, "email">[]>();

  const { data: rank } = useGetAppointmentTimeVotesRanking(
    router.query.appointmentcode as string,
    {
      enabled: !!router.isReady,
    }
  );
  const { data: appointment } = useGetAppointment(
    router.query.appointmentcode as string,
    {
      enabled: !!router.isReady,
    }
  );

  const onClickAppointmentRankItem = (rank: AppointmentTimeVotesRanking) => {
    setVoteUsers(rank.users);
  };

  const onClickOtherTimeSelectBtn = () => {
    router.push(
      `/groups/${router.query.groupcode}/appointment/${router.query.appointmentcode}/progress`
    );
  };

  if (!appointment || !rank) return <Loading />;

  const isExpired =
    new Date(appointment?.deadline).getTime() < new Date().getTime();

  return (
    <GroupPage>
      <PageContent>
        <StyledAppointmentTitle>{appointment.title}</StyledAppointmentTitle>
        <StyledDeadline>
          마감기한: {getDateString(new Date(appointment.deadline))}까지
        </StyledDeadline>
        {rank.length > 0 ? (
          <StyledAppointmentVoteRankList>
            {rank?.map((r, index) => (
              <StyledAppointmentVoteRankItem
                key={index}
                onClick={() => onClickAppointmentRankItem(r)}
              >
                <StyledAppointmentVoteRankTimes>
                  <div>{getDateString(new Date(r.date))}</div>
                  <div>
                    ~
                    {getDateString(
                      addMinute(new Date(r.date), appointment.duration_minutes)
                    )}
                  </div>
                </StyledAppointmentVoteRankTimes>
                <div>{r.count}표</div>
              </StyledAppointmentVoteRankItem>
            ))}
          </StyledAppointmentVoteRankList>
        ) : (
          <div>아무도 약속 시간을 정하지 않았나봐요...😭</div>
        )}
        {voteUsers && (
          <StyledUserProfileList>
            {voteUsers?.map((user, index) => (
              <StyledUserProfile key={~~user.id + index}>
                <StyledUserProfileImage
                  src={user.profileImage}
                  alt={user.profileImage}
                  width={50}
                  height={50}
                />
                <span>{user.name}</span>
              </StyledUserProfile>
            ))}
          </StyledUserProfileList>
        )}
        {!isExpired && (
          <Button onClick={onClickOtherTimeSelectBtn}>
            다른 시간을 선택할래요
          </Button>
        )}
      </PageContent>
    </GroupPage>
  );
};

export default AppointmentRank;
