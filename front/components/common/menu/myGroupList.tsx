import { Group } from "@/types/group";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const FunctionLinkStyle = styled(Link)`
  text-decoration: none;
  color: rgb(0, 0, 0);
  cursor: pointer;
  width: 100%;
`;

const MyGroupListStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface GroupNameSectionStyleProps {
  active?: "true" | "false";
}
const GroupNameSectionStyle = styled.div<GroupNameSectionStyleProps>`
  display: flex;
  gap: 2rem;
  -webkit-box-align: center;
  align-items: center;
  padding: 14px;
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
      <h3>내 그룹</h3>
      {userGroups?.map((group) => {
        return (
          <FunctionLinkStyle
            href={{
              pathname: `/groups/${group.code}`,
            }}
            about="내 그룹"
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
