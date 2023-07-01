import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/common/button";

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

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  border-radius: 14px;
  padding: 0.5rem;
  border: 1px solid #f8c6d2;
  font-family: inherit;
`;

interface ModalContentProps {
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonText: string;
}

const ModalContent = ({
  title,
  description,
  inputPlaceholder,
  buttonText,
}: ModalContentProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Input placeholder={inputPlaceholder}></Input>
      <Button size="l">{buttonText}</Button>
    </>
  );
};

export default ModalContent;
