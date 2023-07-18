import { Group } from "@/types/group";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Modal from "../modal";

const Title = styled.p`
  margin-bottom: 1rem;
`;

const FunctionLinkStyle = styled(Link)`
  text-decoration: none;
  color: rgb(0, 0, 0);
  cursor: pointer;
  width: 100%;
`;

const MyGroupListStyle = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 220px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface GroupNameSectionStyleProps {
  active?: "true" | "false";
}
const GroupNameSectionStyle = styled.div<GroupNameSectionStyleProps>`
  display: flex;
  gap: 1rem;
  -webkit-box-align: center;
  align-items: center;
  padding: 8px;
  text-decoration: none;
  color: rgb(0, 0, 0);
  cursor: pointer;
  background-color: ${(props) =>
    props.active === "true" ? "rgb(245, 245, 245)" : "transparent"};

  border-radius: 14px;
  width: 100%;
  box-sizing: border-box;
`;

const GroupNameIconStyle = styled.div`
  color: rgb(255, 255, 255);
  font-size: 30px;
  background-color: #f4356c;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  padding: 0.5rem;
  border-radius: 14px;
`;

interface MyGroupListProps {
  userGroups: Group[];
  currentGroup: Group;
}
const MyGroupList = ({ userGroups, currentGroup }: MyGroupListProps) => {
  return (
    <MyGroupListStyle>
      <Title>모임</Title>
      {userGroups?.map((group) => {
        return (
          <FunctionLinkStyle
            href={{
              pathname: `/groups/${group.code}`,
            }}
            about="내 모임"
            key={group.id}
          >
            <GroupNameSectionStyle
              active={currentGroup.code === group.code ? "true" : "false"}
            >
              <GroupNameIconStyle>{group.name.charAt(0)}</GroupNameIconStyle>
              {group.name}
            </GroupNameSectionStyle>
          </FunctionLinkStyle>
        );
      })}
    </MyGroupListStyle>
  );
};

export default MyGroupList;
