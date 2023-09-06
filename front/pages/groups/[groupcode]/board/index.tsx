import Input from "@/components/common/Input";
import Button from "@/components/common/button";
import ActionTip from "@/components/layout/ActionTip";
import ContentBox from "@/components/layout/ContentBox";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
  border: 1px solid #f8c6d2;
  border-radius: 14px;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  //줄바꿈
  white-space: pre-wrap;
  //스크롤바
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 0;
  }

  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #ccc;
  }
`;

const BoardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BoardItem = styled.li`
  border: 1px solid #ccc;
  border-radius: 14px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const BoardComment = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BoardCommentItem = styled.li`
  border: 1px solid #ccc;
  border-radius: 14px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Board = () => {
  return (
    <GroupPage>
      <PageContent>
        <ContentBox>
          <ActionTip>
            모임에 전하는 <strong>메세지</strong>를 적어주세요!
          </ActionTip>
          <Label>Title</Label>
          <Input align="left" />
          <br />
          <Label>Content</Label>
          <Textarea></Textarea>
          <Button align="right" size="s">
            등록
          </Button>
        </ContentBox>

        <ContentBox>
          <ActionTip>
            등록된 <strong>메세지</strong>를 확인해보세요!
          </ActionTip>
        </ContentBox>

        <ContentBox>
          <ActionTip>
            등록된 메시지가 없어요...😭 <br />첫 <strong>메세지</strong>를
            생성해 볼까요?
          </ActionTip>
        </ContentBox>

        <ContentBox>
          <BoardList>
            <BoardItem>
              <h3>제목</h3>
              <p>내용</p>
              <p>작성자</p>
              <p>작성일</p>
              <BoardComment>
                <BoardCommentItem>
                  <p>댓글내용</p>
                  <p>작성자</p>
                  <p>작성일</p>
                </BoardCommentItem>
              </BoardComment>
            </BoardItem>
            <BoardItem>
              <h3>제목</h3>
              <p>내용</p>
              <p>작성자</p>
              <p>작성일</p>
              <BoardComment>
                <BoardCommentItem>
                  <p>댓글내용</p>
                  <p>작성자</p>
                  <p>작성일</p>
                </BoardCommentItem>
              </BoardComment>
            </BoardItem>
            <BoardItem>
              <h3>제목</h3>
              <p>내용</p>
              <p>작성자</p>
              <p>작성일</p>
              <BoardComment>
                <BoardCommentItem>
                  <p>댓글내용</p>
                  <p>작성자</p>
                  <p>작성일</p>
                </BoardCommentItem>
              </BoardComment>
            </BoardItem>
          </BoardList>
        </ContentBox>

        <div>
          <p>Todo</p>
          <h1>게시판</h1>
          <h2>게시글 (react-query의 infinite scroll 사용)</h2>
          <ul>
            <li>게시글 목록</li>
            <li>게시글 작성</li>

            <li>게시글 수정</li>
            <li>게시글 삭제</li>
            <li>게시글 검색</li>
            <li>게시글 필터링</li>
            <li>게시글 정렬</li>
            <li>게시글 상세</li>
            <li>게시글 좋아요</li>
            <li>게시글 댓글</li>
            <li>게시글 댓글 좋아요</li>
          </ul>
        </div>
      </PageContent>
    </GroupPage>
  );
};

export default Board;
