import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #000;
  border-top: 5px solid #fff;
  animation: ${LoadingAnimation} 1s linear infinite;
  transform: translate(-50%, -50%);
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingIcon />
    </LoadingWrapper>
  );
};

export default Loading;
