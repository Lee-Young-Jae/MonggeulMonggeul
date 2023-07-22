import React from "react";
import styled from "styled-components";

const RadioWrapperStyle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RadioLabelStyle = styled.label``;

const RadioInputStyle = styled.input`
  margin: 0;
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid #ced4da;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s all ease-in-out;
  cursor: pointer;

  &:checked {
    background: #f4356c;
    &::after {
      content: "";
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.2rem;
      border-radius: 50%;
      background: white;
    }
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: #f4356c;
    &::after {
      content: "";
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.2rem;
      border-radius: 50%;
      background: white;
    }
  }
`;

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

const Radio = ({ name, value, onChange, children, className }: RadioProps) => {
  return (
    <RadioWrapperStyle className={className}>
      <RadioInputStyle
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        id={value}
      />
      <RadioLabelStyle htmlFor={value}>{children}</RadioLabelStyle>
    </RadioWrapperStyle>
  );
};

export default Radio;
