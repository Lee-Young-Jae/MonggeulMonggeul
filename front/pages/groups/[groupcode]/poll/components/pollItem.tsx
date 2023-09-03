import Button from "@/components/common/button";
import { Poll, subject } from "@/types/poll";
import { getDateString } from "@/utills/common";
import React from "react";
import styled from "styled-components";
import { useDeletePoll } from "@/hooks/queries/poll/useDelete";
import { useRouter } from "next/router";
import Loading from "@/components/common/loading";

const PollItemStyle = styled.div`
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  width: 100%;
  @media (min-width: 500px) {
    width: 49%;
  }
`;

interface ProgressBarProps {
  percentmax: number;
  percentcurrent: number;
}
const ProgressBar = styled.div<ProgressBarProps>`
  width: 100%;
  height: 1rem;
  border-radius: 15px;
  background-color: #ccc;
  position: relative;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.percentcurrent / props.percentmax) * 100}%;
    height: 100%;
    background-color: #f4356c;
    border-radius: 15px;
  }

  & > p {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 1rem;
  }
`;

const OptionsStyle = styled.div`
  color: #ccc;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const PollItem = ({
  id,
  title,
  isAnonymous,
  isMultiple,
  closedAt,
  PollSubjects,
  isVoted,
  code,
  userCount,
}: Poll & { userCount: number }) => {
  const { mutate: deleteMutate } = useDeletePoll();

  const router = useRouter();
  if (!PollSubjects) return <Loading />;

  const votedUserCount = new Set(
    PollSubjects.map((subject) =>
      subject.Votes.map((vote) => vote.UserId)
    ).flat(1)
  ).size;

  const onDeletePoll = () => {
    const result = window.confirm("정말 삭제하시겠습니까?");

    if (result) {
      deleteMutate(id);
    }
  };

  const isOver = new Date(closedAt) < new Date();

  return (
    <PollItemStyle>
      <div>{title}</div>
      <ProgressBar percentmax={userCount} percentcurrent={votedUserCount}>
        <p>
          {votedUserCount}명/{userCount}명
        </p>
      </ProgressBar>

      <OptionsStyle>
        {`${isAnonymous ? "익명투표" : "기명투표"} | ${
          isMultiple ? "여러개 투표가능" : "하나만 투표 가능"
        }
              `}
      </OptionsStyle>
      <div>{getDateString(new Date(closedAt))}까지</div>

      {isVoted || isOver ? (
        <Button
          onClick={() => {
            router.push(
              `/groups/${router.query.groupcode}/poll/${code}/result`
            );
          }}
        >
          결과보기
        </Button>
      ) : (
        <Button
          onClick={() => {
            router.push(`/groups/${router.query.groupcode}/poll/${code}`);
          }}
        >
          투표하기
        </Button>
      )}

      <Button color="unimportant" onClick={onDeletePoll}>
        투표 삭제하기
      </Button>
    </PollItemStyle>
  );
};

export default PollItem;
