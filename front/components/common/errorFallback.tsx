import { ErrorResponse } from "@/types/axios";
import { AxiosError } from "axios";
import React from "react";
import Modal from "./modal";
import { useLottie } from "lottie-react";
import notFoundLottie from "@/assets/not-found-animation.json";
import styled from "styled-components";
import Button from "@/components/common/button";
import { useRouter } from "next/router";

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
`;

const NavigationButton = styled(Button)`
  background-color: #ffba00;
`;

interface ErrorFallbackProps {
  error: AxiosError<ErrorResponse>;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const { message } = error.response?.data || { message: "알 수 없는 오류" };
  const { status } = error.response || { status: 500 };

  const notFoundAnimation = useLottie({
    animationData: notFoundLottie,
    loop: true,
    autoplay: true,
    width: "20rem",
  });
  const router = useRouter();
  const isNotAuthorized = status === 401 || status === 403;
  const isNotFound = status === 404;

  const onClickHandler = () => {
    if (isNotFound) {
      router.back();
      resetErrorBoundary();
    } else if (isNotAuthorized) {
      router.push("/");
      resetErrorBoundary();
    } else {
      resetErrorBoundary();
    }
  };

  return (
    <NotFoundWrapper>
      {notFoundAnimation.View}
      {message}
      <NavigationButton
        size="m"
        onClick={() => {
          router.push("/");
        }}
      >
        메인 페이지로 갈게요
      </NavigationButton>
      <Modal visible={true} onClose={onClickHandler}>
        <p>{message}</p>
        <Button onClick={onClickHandler}>돌아가기</Button>
      </Modal>
    </NotFoundWrapper>
  );
};

export default ErrorFallback;
