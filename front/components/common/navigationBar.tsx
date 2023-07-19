import styled from "styled-components";
import {
  TiHome,
  TiTicket,
  TiCalendar,
  TiThMenu,
  TiMessage,
} from "react-icons/ti";
import Menu from "./menu";

import { useState, useCallback } from "react";
import { useRouter } from "next/router";

const NavigationStyle = styled.div`
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

const NavigationButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const NavigationBar = () => {
  const router = useRouter();
  const [menuVisiable, setMenuVisible] = useState(false);
  const onClickMenuBtn = useCallback(() => {
    setMenuVisible((prev) => !prev);
  }, []);

  return (
    <>
      <NavigationStyle>
        <NavigationButton>
          <TiHome
            aria-label="Main"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          ></TiHome>
        </NavigationButton>
        <NavigationButton>
          <TiTicket
            aria-label="Poll"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          ></TiTicket>
        </NavigationButton>
        <NavigationButton>
          <TiCalendar
            aira-label="Appointment"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          ></TiCalendar>
        </NavigationButton>
        <NavigationButton>
          <TiMessage
            aira-label="Chat"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          ></TiMessage>
        </NavigationButton>
        <NavigationButton onClick={onClickMenuBtn}>
          <TiThMenu
            aria-label="Menu"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          ></TiThMenu>
        </NavigationButton>
      </NavigationStyle>

      <Menu visiable={menuVisiable} setVisiable={setMenuVisible}></Menu>
    </>
  );
};

export default NavigationBar;
