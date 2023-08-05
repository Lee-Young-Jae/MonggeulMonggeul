import Input from "@/components/common/Input";
import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import Radio from "@/components/common/radio";
import RadioGroup from "@/components/common/radio/radioGroup";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import useInput from "@/hooks/common/useInput";
import {
  useCreatePollVote,
  useCreatePollVoteMultiple,
} from "@/hooks/queries/poll/useCreate";
import { useGetPoll } from "@/hooks/queries/poll/useGet";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import CheckList from "@/components/common/checkList";
import CheckboxGroup from "@/components/common/checkList/checkboxGroup";
import styled, { keyframes } from "styled-components";
import { getDateString } from "@/utills/common";

interface ProgressProps {
  current_date: Date;
  closed_at: Date;
  created_at: Date;
}

const VoteSelectStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const VoteStyle = styled.div`
  background-color: white;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  border-radius: 15px;
  padding: 0.5rem;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: white;
  width: 80%;
  box-sizing: border-box;
  padding: 1rem;
`;

const ProgressBarStyle = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
  position: relative;
  overflow: hidden;
`;

const progressAnimation = keyframes`
  from {
    width: 0%;
  }
`;

const ProgressStyle = styled.div<ProgressProps>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${(props) => {
    const { current_date, closed_at, created_at } = props;
    const total = closed_at.getTime() - created_at.getTime();
    const current = current_date.getTime() - created_at.getTime();
    return (current / total) * 100;
  }}%;
  background-color: #f4356c;
  border-radius: 0.25rem;
  animation: ${progressAnimation} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Vote = () => {
  const router = useRouter();
  const {
    data: poll,
    isLoading,
    isSuccess: isSuccessGetPoll,
  } = useGetPoll(router.query.votecode as string, {
    enabled: !!router.isReady,
  });

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedSubjectList, setSelectedSubjectList] = useState<string[]>([]);
  const [subjectComment, subjectCommentHandler] = useInput("");
  const [subjectCommentList, setSubjectCommentList] = useState<{
    [key: string]: string;
  }>({});

  const { mutate: voteMutate, isSuccess: voteIsSuccess } = useCreatePollVote();
  const { mutate: voteMultipleMutate, isSuccess: voteMultipleIsSuccess } =
    useCreatePollVoteMultiple();

  const isMultiple = poll?.isMultiple as boolean;
  const isOver = new Date(poll?.closedAt as string) < new Date();

  const vote = useCallback(() => {
    // 유효성 검증
    if (isMultiple) {
      if (selectedSubjectList.length === 0) {
        alert("투표할 항목을 선택해주세요.");
        return;
      }
      voteMultipleMutate({
        subjectIds: selectedSubjectList.map((v) => parseInt(v)),
        comments: selectedSubjectList.map((v) => subjectCommentList[v]),
      });
      return;
    }
    if (selectedSubject === "") {
      alert("투표할 항목을 선택해주세요.");
      return;
    }
    if (subjectComment.length > 100) {
      alert("100자 이내로 입력해주세요.");
      return;
    }
    voteMutate({
      subjectId: parseInt(selectedSubject),
      comment: subjectComment,
    });
  }, [
    selectedSubject,
    subjectComment,
    voteMutate,
    voteMultipleMutate,
    isMultiple,
    selectedSubjectList,
    subjectCommentList,
  ]);

  if (voteIsSuccess || voteMultipleIsSuccess) {
    router.push(`/groups/${router.query.groupcode}/poll/${poll?.code}/result`);
  }

  const handleRadioSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubject(e.target.value);
  };

  const handleCheckboxSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const index = selectedSubjectList.indexOf(value);
    if (index === -1) {
      setSelectedSubjectList([...selectedSubjectList, value]);
    } else {
      setSelectedSubjectList([
        ...selectedSubjectList.slice(0, index),
        ...selectedSubjectList.slice(index + 1),
      ]);
    }
  };

  const handleSubjectComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSubjectCommentList({
      ...subjectCommentList,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isSuccessGetPoll) {
    return (
      <GroupPage>
        <PageContent>
          <VoteStyle>
            <h1>임시 id:{poll.id}</h1>
            <h1>Title: {poll.title}</h1>
            <span>시작일: {getDateString(new Date(poll.createdAt))}</span>
            <span>마감시간: {getDateString(new Date(poll.closedAt))}</span>
            <ProgressBarStyle>
              <ProgressStyle
                created_at={new Date(poll.createdAt)}
                current_date={new Date()}
                closed_at={new Date(poll.closedAt)}
              ></ProgressStyle>
            </ProgressBarStyle>
            <p>{poll.isAnonymous ? "무기명 투표" : "기명 투표"}</p>
            {/* <h1>createdAt: {poll.createdAt}</h1> */}
            <h1>공유하기 코드 : {poll.code}</h1>

            {isMultiple ? (
              <CheckboxGroup label="체크박스 테스트">
                {poll.PollSubjects.map((subject) => {
                  return (
                    <VoteSelectStyle key={subject.id}>
                      <CheckList
                        value={subject.id.toString()}
                        handler={handleCheckboxSubject}
                      >
                        {subject.title}
                      </CheckList>
                      {selectedSubjectList.includes(subject.id.toString()) && (
                        <Input
                          width="l"
                          value={subjectCommentList[subject.id]}
                          name={subject.id.toString()}
                          onChange={handleSubjectComment}
                          placeholder={`${subject.title}에 대한 의견이 있나요?`}
                        ></Input>
                      )}
                    </VoteSelectStyle>
                  );
                })}
              </CheckboxGroup>
            ) : (
              <RadioGroup label="고르세용~" flex_direction="column">
                {poll.PollSubjects.map((subject) => {
                  return (
                    <VoteSelectStyle key={subject.id}>
                      <Radio
                        name={poll.id.toString()}
                        value={subject.id.toString()}
                        onChange={handleRadioSubject}
                      >
                        {subject.title}
                      </Radio>
                      {selectedSubject === subject.id.toString() && (
                        <Input
                          width="l"
                          value={subjectComment}
                          name={subject.id.toString()}
                          onChange={subjectCommentHandler}
                          placeholder={`${subject.title}에 대한 의견이 있나요?`}
                        ></Input>
                      )}
                    </VoteSelectStyle>
                  );
                })}
              </RadioGroup>
            )}

            <Button disabled={isOver} onClick={vote}>
              {isOver ? "마감된 투표입니다" : "투표하기"}
            </Button>
          </VoteStyle>
        </PageContent>
      </GroupPage>
    );
  }

  return <Loading></Loading>;
};

export default Vote;
