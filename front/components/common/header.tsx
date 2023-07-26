import styled from "styled-components";
import Image from "next/image";
import Logo2 from "@/assets/Logo_no_background.png";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { groupAtom } from "@/recoil/state/groupstate";
import { useGetGroup } from "@/hooks/queries/group/useGet";

const HeaderStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(255, 255, 255);
  border-radius: 10px 10px 0px 0px;
  box-sizing: border-box;
  padding: 5px 10px;
`;

const GroupDescription = styled.div`
  display: flex;
  align-items: center;
`;

const GroupIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 1.2rem;
  font-family: "omyuPretty", sans-serif;
  background-color: #f8c6d2;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-right: 10px;
`;

const GroupName = styled.div`
  margin-right: 10px;
`;

const Header = () => {
  const router = useRouter();
  // const [groupState, setGroupState] = useRecoilState(groupAtom);

  const { data: group } = useGetGroup(router.query.groupcode as string, {
    enabled: !!router.isReady,
  });

  const pushToGroupPage = () => {
    router.push(`/groups/${group?.code}`);
  };

  return (
    <HeaderStyle>
      <Image
        style={{
          width: "4rem",
          height: "4rem",
          cursor: "pointer",
        }}
        src={Logo2}
        alt="Logo"
        priority
        onClick={pushToGroupPage}
      ></Image>
      <GroupDescription>
        <GroupName>🌎{group?.name}</GroupName>
        <GroupIcon>{group?.name.slice(0, 1)}</GroupIcon>
      </GroupDescription>
    </HeaderStyle>
  );
};

export default Header;

// sql order by Datetime 비교
