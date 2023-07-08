import React, { useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";

const MenuSlide = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const MenuStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  animation: ${MenuSlide} 0.5s ease-in-out forwards;
`;

interface MenuProps {
  isVisiable: boolean;
}
const Menu = ({ isVisiable }: MenuProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isVisiable) {
      setTimeout(() => {
        router.push("/groups");
      }, 500);
    }
  }, [isVisiable]);

  return <MenuStyle></MenuStyle>;
};

export default Menu;
