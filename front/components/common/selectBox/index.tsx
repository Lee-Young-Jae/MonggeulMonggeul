import React from "react";
import styled from "styled-components";

const StyledSelectBox = styled.select`
  /* appearance: none; */
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 14px;
  text-align: center;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
  }

  option {
    width: 80%;
    height: 40px;
    border: none;
    border-radius: 14px;
    background-color: #ffffff;
    color: #000000;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 20px;
    margin: 10px 0px;
    cursor: pointer;
  }
`;

const SelectBox = <ValueType extends string | number>({
  options,
  value,
  onChange,
}: {
  options: ValueType[];
  value: ValueType;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <StyledSelectBox value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelectBox>
  );
};

export default SelectBox;
