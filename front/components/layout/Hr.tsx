import React from "react";
import styled from "styled-components";

interface Props {
  color?: "default" | "gray";
}

const StyledHr = styled.hr<Props>`
  border: none;
  width: 100%;
  height: 1px;
  background-color: inherit;
  ${(props) =>
    props.color === "gray" &&
    `
    border-top: 1px solid #ccc;
  `}
  ${(props) =>
    props.color === "default" &&
    `
    border-top: 1px solid #f8c6d2;
  `}
`;

const Hr = ({ color = "default" }: Props) => {
  return <StyledHr color={color} />;
};

export default Hr;
