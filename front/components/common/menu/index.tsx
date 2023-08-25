import React, { useEffect, useState, memo } from "react";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { useGetUserGroups } from "@/hooks/queries/group/useGet";
import useUserLogout from "@/hooks/common/useUserLogout";
import Button from "../button";
import MyGroupList from "./myGroupList";
import { GoX } from "react-icons/go";
import GroupActions from "./groupActions";
import UsersProfile from "./components/UsersProfile";

const MenuCloseButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  right: 10px;
  cursor: pointer;
`;

const FunctionLinkStyle = styled(Link)`
  text-decoration: none;
  color: rgb(0, 0, 0);
  cursor: pointer;
  width: 100%;
`;

export const HrStyle = styled.hr`
  border-color: rgb(226, 226, 226);
  width: 100%;
  border-width: 0px 0px 0.1rem;
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
  z-index: 100;

  ${(props) =>
    props.visiable === "true" &&
    css`
      animation: ${MenuSlideDown} 0.5s ease-in-out;
    `}
`;

interface MenuProps {
  visiable: boolean;
  setVisiable: React.Dispatch<React.SetStateAction<boolean>>;
}
const Menu = ({ visiable, setVisiable }: MenuProps) => {
  const router = useRouter();
  const [animating, setAnimating] = useState(false);
  const [localVisible, setLocalVisible] = useState(visiable);

  const { data: userGroups } = useGetUserGroups({
    staleTime: 30000,
  });

  const currentGroup = userGroups?.find(
    (group) => group.code === router.query.groupcode
  );

  const handleLogout = useUserLogout();

  useEffect(() => {
    setLocalVisible(visiable);
  }, [visiable]);

  useEffect(() => {
    if (!visiable && localVisible) {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, 460);
      setLocalVisible(visiable);
    }
  }, [visiable, localVisible]);

  if (!animating && !localVisible) {
    return null;
  }

  if (!currentGroup) {
    return null;
  }

  return (
    <MenuStyle visiable={!localVisible ? "true" : "false"}>
      <MenuCloseButtonWrapper
        onClick={() => {
          if (animating) return;
          setVisiable(false);
        }}
      >
        <GoX></GoX>
      </MenuCloseButtonWrapper>

      <MyGroupList
        currentGroup={currentGroup}
        userGroups={userGroups ? userGroups : []}
      ></MyGroupList>

      <GroupActions />

      <HrStyle />
      <h2>기능</h2>
      <FunctionLinkStyle
        href={{
          pathname: `/groups/${router.query.groupcode}/poll`,
        }}
        about="투표하기"
      >
        투표하기
      </FunctionLinkStyle>
      <FunctionLinkStyle
        href={{
          pathname: `/groups/${router.query.groupcode}/appointment`,
        }}
        about="약속잡기"
      >
        약속잡기
      </FunctionLinkStyle>
      <FunctionLinkStyle
        href={{
          pathname: `/groups/${router.query.groupcode}/chat`,
        }}
        about="채팅하기"
      >
        채팅하기
      </FunctionLinkStyle>

      <HrStyle />
      <h2>멤버 목록 ({currentGroup.Users.length})</h2>
      <UsersProfile currentGroup={currentGroup} />
      <HrStyle />
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
