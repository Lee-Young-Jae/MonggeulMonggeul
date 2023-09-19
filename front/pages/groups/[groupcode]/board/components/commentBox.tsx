import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 50px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 14px;
  padding: 0.5rem 1rem;
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

const Header = styled.div`
  display: flex;

  & > p {
  }
`;

const CommentItem = () => {
  return (
    <div>
      <Label>댓글</Label>
      <Textarea placeholder="댓글을 입력하세요." />
      <Header>
        <p>댓글</p>
        <p>0</p>
      </Header>
    </div>
  );
};

export default CommentItem;
