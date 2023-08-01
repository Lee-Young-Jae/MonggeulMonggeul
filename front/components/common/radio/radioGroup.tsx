import React from "react";
import styled from "styled-components";

interface RadioGroupStyleProps {
  children: React.ReactNode;
  flex_direction: string;
}

const RadioGroupStyle = styled.fieldset<RadioGroupStyleProps>`
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  flex-direction: ${(props) => props.flex_direction};
`;

interface RadioGroupProps {
  label: string;
  children: React.ReactNode;
  flex_direction?: string;
}

const RadioGroup = ({
  label,
  flex_direction = "default",
  children,
}: RadioGroupProps) => {
  return (
    <>
      <legend>{label}</legend>
      <RadioGroupStyle flex_direction={flex_direction}>
        {children}
      </RadioGroupStyle>
    </>
  );
};

export default RadioGroup;
