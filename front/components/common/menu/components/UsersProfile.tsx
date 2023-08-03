import React from "react";
import styled from "styled-components";
import Image from "next/image";
import anonymous from "@/assets/anonymous.png";
import { Group } from "@/types/group";

const UserProfileGridStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "profileImage profileName";
  width: 100%;
`;

const UserProfileStyle = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;

  & > p {
    margin-left: 10px;
  }
`;

const ProfileImageStyle = styled(Image)`
  border-radius: 50%;
`;

interface UserProfileProps {
  currentGroup: Group;
}

const UsersProfile = ({ currentGroup }: UserProfileProps) => {
  return (
    <UserProfileGridStyle>
      {currentGroup.Users.map((member) => (
        <UserProfileStyle key={member.id}>
          <ProfileImageStyle
            width={50}
            height={50}
            alt="프로필 이미지"
            src={member.profileImage ? member.profileImage : anonymous}
          />
          <p>{member.name}</p>
        </UserProfileStyle>
      ))}
    </UserProfileGridStyle>
  );
};

export default UsersProfile;
