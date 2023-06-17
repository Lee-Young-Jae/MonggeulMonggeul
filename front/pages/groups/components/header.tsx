import styled from "styled-components";

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
  font-family: "Nanum Gothic", sans-serif;
  background-color: rgb(238, 237, 255);
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-right: 10px;
`;

const GroupName = styled.div`
  font-family: "Nanum Gothic", sans-serif;
  margin-right: 10px;
`;

const Header = () => {
  return (
    <HeaderStyle>
      <div>LogoImg</div>
      <GroupDescription>
        <GroupName>🌎안녕</GroupName>

        <GroupIcon>안</GroupIcon>
      </GroupDescription>
    </HeaderStyle>
  );
};

export default Header;

// sql order by Datetime 비교
