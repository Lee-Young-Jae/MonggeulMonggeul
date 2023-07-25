import React from "react";
import styled from "styled-components";

const CheckBoxStyle = styled.label`
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + span {
    display: inline-block;
    display: flex;
    align-items: center;
    position: relative;
  }

  // 체크하기 전
  input[type="checkbox"] + span::before {
    content: "";
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 1px solid #ccc;
    color: white;
    border-radius: 0.2rem;
    transition: 0.1s all ease-in-out;
  }

  // 체크한 후
  input[type="checkbox"]:checked + span::before {
    content: "✔";
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    background: #f4356c;
    color: white;
    text-align: center;
    line-height: 1rem;
    transition: 0.1s all ease-in-out;
  }
`;

interface CheckBoxProps {
  children: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  handler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const CheckList = ({
  children,
  disabled,
  checked,
  handler,
  value,
}: CheckBoxProps) => {
  return (
    <CheckBoxStyle>
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={handler}
        value={value}
      />
      <span>{children}</span>
    </CheckBoxStyle>
  );
};

export default CheckList;
