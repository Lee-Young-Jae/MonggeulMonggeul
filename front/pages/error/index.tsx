import { useLottie } from "lottie-react";
import notFoundLottie from "@/assets/not-found-animation.json";

const ErrorPage = () => {
  const notFoundAnimation = useLottie({
    animationData: notFoundLottie,
    loop: true,
    autoplay: true,
    width: "20rem",
  });
  return (
    <div>
      <div>
        {notFoundAnimation.View}
        찾을 수 없는 페이지입니다.
        <br />
        요청하신 페이지가 사라졌거나, 잘못된 경로로 들어오셨어요 :)
      </div>
    </div>
  );
};

export default ErrorPage;
