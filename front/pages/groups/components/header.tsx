import styled from "styled-components";
import Image from "next/image";
import Logo from "../../../assets/Logo.png";
import Logo2 from "../../../assets/Logo_no_background.png";

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
  return (
    <HeaderStyle>
      <Image
        style={{
          width: "4rem",
          height: "4rem",
        }}
        src={Logo2}
        alt="Logo"
      ></Image>
      <GroupDescription>
        <GroupName>🌎안녕</GroupName>
        <GroupIcon>안</GroupIcon>
      </GroupDescription>
    </HeaderStyle>
  );
};

export default Header;

// sql order by Datetime 비교
