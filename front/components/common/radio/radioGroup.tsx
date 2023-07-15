import React from "react";
import styled from "styled-components";

const RadioGroupStyle = styled.fieldset`
  border: none;
  padding: 0;
  margin-bottom: 1.5rem;
  display: flex;
`;

interface RadioGroupProps {
  label: string;
  children: React.ReactNode;
}

const RadioGroup = ({ label, children }: RadioGroupProps) => {
  return (
    <RadioGroupStyle>
      <legend>{label}</legend>
      {children}
    </RadioGroupStyle>
  );
};

export default RadioGroup;
