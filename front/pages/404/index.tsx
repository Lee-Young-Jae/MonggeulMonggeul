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

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage = ({ statusCode }: ErrorPageProps) => {
  const notFoundAnimation = useLottie({
    animationData: notFoundLottie,
    loop: true,
    autoplay: true,
    width: "20rem",
  });

  const router = useRouter();

  return (
    <NotFoundWrapper>
      {notFoundAnimation.View}
      찾을 수 없는 페이지네요...
      <br />
      <br />
      요청하신 페이지가 사라졌거나, 잘못된 경로로 들어오신것 같아요
      <NavigationButton
        size="m"
        onClick={() => {
          router.push("/");
        }}
      >
        메인 페이지로 갈게요
      </NavigationButton>
    </NotFoundWrapper>
  );
};

export default ErrorPage;
