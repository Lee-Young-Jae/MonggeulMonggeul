import Input from "@/components/common/Input";
import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import Radio from "@/components/common/radio";
import RadioGroup from "@/components/common/radio/radioGroup";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import useInput from "@/hooks/common/useInput";
import { useCreatePollVote } from "@/hooks/queries/poll/useCreate";
import { useGetPoll } from "@/hooks/queries/poll/useGet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { VoteStyle } from "./component";

const Vote = () => {
  const router = useRouter();
  const {
    data: poll,
    isLoading,
    isSuccess: isSuccessGetPoll,
  } = useGetPoll(router.query.vote as string, {
    enabled: !!router.isReady,
  });

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [subjectComment, subjectCommentHandler] = useInput("");
  const { mutate } = useCreatePollVote();

  const vote = () => {
    if (selectedSubject === "") {
      alert("투표할 항목을 선택해주세요.");
      return;
    }

    console.log(selectedSubject, subjectComment);

    mutate({
      subjectId: parseInt(selectedSubject),
      comment: subjectComment,
    });
  };

  const handleSelectSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubject(e.target.value);
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
            <h1>closedAt: {poll.closedAt}</h1>
            <h1>isAnonymous: {poll.isAnonymous}</h1>
            <h1>isMultiple: {poll.isMultiple}</h1>
            <h1>createdAt: {poll.createdAt}</h1>
            <h1>code: {poll.code}</h1>
            <RadioGroup label="고르세용~">
              {poll.PollSubjects.map((subject) => {
                return (
                  <Radio
                    key={subject.id}
                    name={poll.id.toString()}
                    value={subject.id.toString()}
                    onChange={handleSelectSubject}
                  >
                    {subject.title}
                  </Radio>
                );
              })}
            </RadioGroup>
            <Input
              value={subjectComment}
              onChange={subjectCommentHandler}
            ></Input>
            <Button onClick={vote}>투표하기</Button>
          </VoteStyle>
        </PageContent>
      </GroupPage>
    );
  }

  return <Loading></Loading>;
};

export default Vote;
