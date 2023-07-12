import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/common/button";
import Input from "@/components/common/Input";

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;

  color: #666666;
`;

interface ModalContentProps {
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonText: string;
  inputHandler: React.ChangeEventHandler<HTMLInputElement>;
  inputValue: string;
  onClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ModalContent = ({
  title,
  description,
  inputPlaceholder,
  buttonText,
  inputHandler,
  inputValue,
  onClickHandler,
}: ModalContentProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Input
        onChange={inputHandler}
        value={inputValue}
        placeholder={inputPlaceholder}
      ></Input>
      <Button
        size="l"
        onClick={(event) => {
          event.preventDefault();
          if (onClickHandler) onClickHandler(event);
        }}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default ModalContent;
