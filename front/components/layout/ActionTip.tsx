import React from "react";
import styled from "styled-components";

const StyledActionTip = styled.h1`
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 1rem;

  & > strong {
    font-weight: 700;
    color: #f4356c;
  }
`;

const ActionTip = ({ children }: { children: React.ReactNode }) => {
  return <StyledActionTip>{children}</StyledActionTip>;
};

export default ActionTip;
