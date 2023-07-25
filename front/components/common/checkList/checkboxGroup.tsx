import React, { useCallback } from "react";
import styled from "styled-components";

const CheckboxGroupStyle = styled.fieldset`
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

interface CheckboxGroupProps {
  children: React.ReactNode;
  label?: string;
}

const CheckboxGroup = ({ label, children }: CheckboxGroupProps) => {
  return (
    <CheckboxGroupStyle>
      <legend>{label}</legend>
      {children}
    </CheckboxGroupStyle>
  );
};

export default CheckboxGroup;
