import Button from "@/components/common/button";
import styled from "styled-components";
import {
  TiHome,
  TiTicket,
  TiCalendar,
  TiThMenu,
  TiMessage,
} from "react-icons/ti";

const MenuStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0px;
  height: 10%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

const MenuButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Menu = () => {
  return (
    <MenuStyle>
      <MenuButton>
        <TiHome
          aria-label="Main"
          style={{
            width: "2rem",
            height: "2rem",
          }}
        ></TiHome>
      </MenuButton>
      <MenuButton>
        <TiTicket
          aria-label="Poll"
          style={{
            width: "2rem",
            height: "2rem",
          }}
        ></TiTicket>
      </MenuButton>
      <MenuButton>
        <TiCalendar
          aira-label="Appointment"
          style={{
            width: "2rem",
            height: "2rem",
          }}
        ></TiCalendar>
      </MenuButton>
      <MenuButton>
        <TiMessage
          aira-label="Chat"
          style={{
            width: "2rem",
            height: "2rem",
          }}
        ></TiMessage>
      </MenuButton>
      <MenuButton>
        <TiThMenu
          aria-label="Menu"
          style={{
            width: "2rem",
            height: "2rem",
          }}
        ></TiThMenu>
      </MenuButton>
    </MenuStyle>
  );
};

export default Menu;
