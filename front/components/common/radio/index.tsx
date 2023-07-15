import React from "react";
import styled from "styled-components";

const RadioLabelStyle = styled.label`
  line-height: 1.5;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
`;
const RadioStyle = styled.input`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
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

const Radio = ({ name, value, onChange, children, ...rest }: RadioProps) => {
  return (
    <RadioLabelStyle>
      <RadioStyle
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {children}
    </RadioLabelStyle>
  );
};

export default Radio;
