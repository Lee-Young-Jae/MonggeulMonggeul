import React from "react";
import styled from "styled-components";

const RadioGroupStyle = styled.fieldset`
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

interface RadioGroupProps {
  label: string;
  children: React.ReactNode;
}

const RadioGroup = ({ label, children }: RadioGroupProps) => {
  return (
    <>
      <legend>{label}</legend>
      <RadioGroupStyle>{children}</RadioGroupStyle>
    </>
  );
};

export default RadioGroup;
