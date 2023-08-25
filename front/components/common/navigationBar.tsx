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
  const { groupcode } = router.query;
  const [menuVisiable, setMenuVisible] = useState(false);
  const onClickMenuBtn = useCallback(() => {
    setMenuVisible((prev) => !prev);
  }, []);
  const onClickHomeBtn = () => {
    router.push(`/groups/${groupcode}`);
  };
  const onClickTicketBtn = () => {
    router.push(`/groups/${groupcode}/poll`);
  };

  const onClickCalendarBtn = () => {
    router.push(`/groups/${groupcode}/appointment`);
  };

  const onClickChatBtn = () => {
    router.push(`/groups/${groupcode}/chat`);
  };

  return (
    <>
      <NavigationStyle>
        <NavigationButton onClick={onClickHomeBtn}>
          <TiHome
            aria-label="Main"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          ></TiHome>
        </NavigationButton>
        <NavigationButton onClick={onClickTicketBtn}>
          <TiTicket
            aria-label="Poll"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          ></TiTicket>
        </NavigationButton>
        <NavigationButton onClick={onClickCalendarBtn}>
          <TiCalendar
            aira-label="Appointment"
            style={{
              width: "2rem",
              height: "2rem",
            }}
          ></TiCalendar>
        </NavigationButton>
        <NavigationButton onClick={onClickChatBtn}>
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
