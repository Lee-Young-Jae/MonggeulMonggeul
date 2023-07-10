import React, { useEffect, useState, memo } from "react";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";
import { groupAtom } from "@/recoil/state/groupstate";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { useGetUserGroups } from "@/hooks/queries/group/useGet";

import useUserLogout from "@/hooks/common/useUserLogout";
import Button from "./button";
import Modal from "./modal";
import useInput from "@/hooks/common/useInput";
import Input from "./Input";
import MyGroupList from "./menu/myGroupList";

const FunctionLinkStyle = styled(Link)`
  text-decoration: none;
  color: rgb(0, 0, 0);
  cursor: pointer;
  width: 100%;
`;

const MenuSlideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const MenuSlideDown = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
`;

interface MenuStyleProps {
  visiable: "true" | "false";
}

const MenuStyle = styled.div<MenuStyleProps>`
  display: flex;
  align-items: start;
  justify-content: space-evenly;
  flex-direction: column;
  animation: ${MenuSlideUp} 0.5s ease-in-out;
  min-height: 100%;
  padding: 14px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;

  ${(props) =>
    props.visiable === "true" &&
    css`
      animation: ${MenuSlideDown} 0.5s ease-in-out;
    `}
`;

const ModalTitleStyle = styled.div`
  text-align: center;
`;

interface MenuProps {
  visiable: boolean;
  setVisiable: React.Dispatch<React.SetStateAction<boolean>>;
}
const Menu = ({ visiable, setVisiable }: MenuProps) => {
  const router = useRouter();
  const [animating, setAnimating] = useState(false);
  const [localVisible, setLocalVisible] = useState(visiable);
  const [groupJoinModal, setGroupJoinModal] = useState(false);
  const [groupLeaveModal, setGroupLeaveModal] = useState(false);

  const [groupCreateModal, setGroupCreateModal] = useState(false);
  const [groupInviteModal, setGroupInviteModal] = useState(false);

  const { data: userGroups } = useGetUserGroups();

  const [groupJoinInputValue, groupJoinInputHandler] = useInput("");

  const [currentGroup, setCurrentGroup] = useRecoilState(groupAtom);

  const handleLogout = useUserLogout();

  useEffect(() => {
    setLocalVisible(visiable);
  }, [visiable]);

  useEffect(() => {
    if (!visiable && localVisible) {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, 490);
      setLocalVisible(visiable);
    }
  }, [visiable, localVisible]);

  if (!animating && !localVisible) {
    return null;
  }

  return (
    <MenuStyle visiable={!localVisible ? "true" : "false"}>
      <button
        onClick={() => {
          setVisiable(false);
        }}
      >
        나가기
      </button>

      <MyGroupList
        currentGroup={currentGroup.currentGroup}
        userGroups={userGroups ? userGroups : []}
      ></MyGroupList>

      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setGroupJoinModal(true);
        }}
      >
        새로운 그룹 참가
      </div>
      {groupJoinModal && (
        <Modal
          visible={groupJoinModal}
          onClose={() => {
            setGroupJoinModal(false);
          }}
        >
          <ModalTitleStyle>
            친구들이 초대한 모임에 참가해보세요!
          </ModalTitleStyle>
          <Input
            value={groupJoinInputValue}
            onChange={groupJoinInputHandler}
            placeholder="그룹 코드를 입력해주세요"
          ></Input>
          <Button>참가하기</Button>
        </Modal>
      )}
      <FunctionLinkStyle
        href={{
          pathname: `/groups`,
        }}
        about="새로운 그룹 생성"
      >
        새로운 그룹 생성
      </FunctionLinkStyle>
      <div
        onClick={() => {
          setGroupLeaveModal(true);
        }}
      >
        그룹 나가기
      </div>
      {groupLeaveModal && (
        <Modal
          visible={groupLeaveModal}
          onClose={() => {
            setGroupLeaveModal(false);
          }}
        >
          <ModalTitleStyle>정말로 그룹을 나가시겠습니까?</ModalTitleStyle>
          <Button>나가기</Button>
        </Modal>
      )}
      <hr></hr>
      <h3>기능</h3>
      <FunctionLinkStyle
        href={{
          pathname: `/groups/${router.query.groupcode}/poll`,
        }}
        about="투표하기"
      >
        투표하기
      </FunctionLinkStyle>
      <div>약속잡기</div>
      <div>채팅하기</div>
      <hr />
      <h3>멤버 목록 ({currentGroup.currentGroup.Users.length}명)</h3>
      <div>멤버 프로필</div>
      <hr />
      <div>새로운 멤버 초대</div>
      <Button
        onClick={() => {
          handleLogout();
          router.replace("/");
        }}
      >
        로그아웃
      </Button>
    </MenuStyle>
  );
};

export default memo(Menu);
