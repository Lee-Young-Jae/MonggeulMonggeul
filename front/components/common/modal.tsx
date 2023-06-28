import React, { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "./button";

const ModalWrapper = styled.div<{ visible: "true" | "false" }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
`;

const ModalFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  cursor: default;

  transition: all 0.1s ease-in-out;
  animation: ${ModalFadeIn} 0.25s ease-in-out;
`;

interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
}

const Modal = ({ visible, children, onClose, onConfirm }: ModalProps) => {
  return (
    <>
      <ModalWrapper
        visible={visible ? "true" : "false"}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose && onClose();
          }
        }}
      >
        <ModalInner>{children}</ModalInner>
      </ModalWrapper>
    </>
  );
};

export default Modal;
