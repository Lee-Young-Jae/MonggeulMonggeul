import Input from "@/components/common/Input";
import Button from "@/components/common/button";
import ActionTip from "@/components/layout/ActionTip";
import ContentBox from "@/components/layout/ContentBox";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import Hr from "@/components/layout/Hr";
import {
  useCreateComment,
  useCreatePost,
} from "@/hooks/queries/board/useCreate";
import { useGetGroupPosts } from "@/hooks/queries/board/useGet";
import { getBeforeTime } from "@/utills/common";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import CommentBox from "./components/commentBox";
import useInput from "@/hooks/common/useInput";

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid #f8c6d2;
  width: 100%;
  border-radius: 14px;
  min-height: 20px;
  font-size: 1rem;
  line-height: 1.5;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out 0s;
  font-family: inherit;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    font-size: 0.8rem;
    color: #ccc;
  }
`;

const BoardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BoardTitle = styled.h3`
  margin-bottom: 1rem;
  // 20자 이상일 경우 ... 표시
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.2rem;
  line-height: 1.5;
  color: #000;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: 0.5rem;
  }
`;

const UserProfileImage = styled(Image)`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50%;
`;

const Board = () => {
  const router = useRouter();

  const { groupcode } = router.query;

  const page = 0;
  const limit = 10;

  const { data: boardList } = useGetGroupPosts(
    groupcode as string,
    page,
    limit,
    {
      enabled: !!groupcode,
    }
  );

  const { mutate: createBoard, isSuccess } = useCreatePost();
  const { mutate: createComment } = useCreateComment();

  const [postTitle, postTitleHandler, resetPostTitle] = useInput("");
  const [postContent, postContentHandler, resetPostContent] = useInput("");

  const handleCreateBoard = () => {
    createBoard({
      groupCode: groupcode as string,
      title: postTitle,
      content: postContent,
    });

    resetPostTitle();
    resetPostContent();
  };

  useEffect(() => {
    if (isSuccess) {
      alert("게시글이 등록되었습니다.");
      resetPostTitle();
      resetPostContent();
    }
  }, [isSuccess]);

  const handleCreateComment = (postId: number) => {
    createComment({
      postId,
      content: "댓글내용",
    });
  };

  return (
    <GroupPage>
      <PageContent>
        <ContentBox>
          <ActionTip>
            모임에 전하는 <strong>메세지</strong>를 적어주세요!
          </ActionTip>
          <Label>Title</Label>
          <Input
            align="left"
            placeholder="제목을 입력해주세요."
            onChange={postTitleHandler}
            maxLength={50}
          />
          <br />
          <Label>Content</Label>
          <StyledTextarea
            placeholder="내용을 입력해주세요."
            onChange={postContentHandler}
            maxLength={300}
          />
          <Button align="right" size="s" onClick={handleCreateBoard}>
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

        {boardList?.map((board) => (
          <BoardList key={board.id}>
            <ContentBox>
              <BoardHeader>
                <UserProfile>
                  <UserProfileImage
                    width={30}
                    height={30}
                    src={board.User.profileImage}
                    alt={board.User.name}
                  />
                  <p>{board.User.name}</p>
                </UserProfile>
                <p>{getBeforeTime(board.createdAt)}</p>
              </BoardHeader>
              <Hr color="gray" />
              <BoardTitle>{board.title}</BoardTitle>
            </ContentBox>
          </BoardList>
        ))}

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
