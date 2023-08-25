import React from "react";
import styled from "styled-components";
import Modal from "@/components/common/modal";
import ModalContent from "./modalContent";

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
`;

const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  color: #666666;
`;

interface RegisterContentProps {
  isSelected: boolean;
  setGroupHandler: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonText: string;
  groupInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  groupInputValue: string;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RegisterContent = ({
  isSelected,
  setGroupHandler,
  title,
  description,
  inputPlaceholder,
  buttonText,
  groupInputHandler,
  groupInputValue,
  onClickHandler,
}: RegisterContentProps) => {
  return (
    <>
      <form
        onClick={(event) => {
          event.preventDefault();
          if (isSelected && event.target !== event.currentTarget) return;
          setGroupHandler((prev) => !prev);
        }}
      >
        <Title>{title}</Title>
        {isSelected ? (
          <Modal visible={isSelected} onClose={() => setGroupHandler(false)}>
            <ModalContent
              title={title}
              description={description}
              inputPlaceholder={inputPlaceholder}
              buttonText={buttonText}
              inputHandler={groupInputHandler}
              inputValue={groupInputValue}
              onClickHandler={onClickHandler}
            ></ModalContent>
          </Modal>
        ) : (
          <Description>{description}</Description>
        )}
      </form>
    </>
  );
};

export default RegisterContent;
