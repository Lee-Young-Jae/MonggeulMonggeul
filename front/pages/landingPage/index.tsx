import React, { useCallback } from "react";
import { useLottie } from "lottie-react";
import pump from "@/assets/2508-pumped-up.json";
import meeting from "@/assets/5066-meeting-and-stuff.json";
import styled from "styled-components";
import forget from "@/assets/16766-forget-password-animation.json";
import confetti from "@/assets/confetti.json";
import Logo from "@/assets/Logo_no_background.png";

import useIntersectionObserver from "../../hooks/common/useIntersectionObserver.ts";
import Button from "@/components/common/button.tsx";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const LandingPageWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const MainSection = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
`;

const MonggeulIntro = styled.h1`
  font-size: 60px;
  font-weight: 700;
  text-align: center;
  position: relative;
  color: rgb(0, 0, 0);
`;

// next Image 컴포넌트
const LogoWrapper = styled.div`
  width: 100%;
  padding-left: 10%;
`;

const KakaoLoginButton = styled(Button)`
  background-color: #fee500;
  color: #000000;
  font-size: 1.5rem;
  font-weight: 700;
  width: 20rem;
  height: 4rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const LandingPage = () => {
  const pumpAnimation = useLottie({
    animationData: pump,
    loop: true,
    autoplay: true,
    width: "20rem",
  });

  const meetingAnimation = useLottie({
    animationData: meeting,
    loop: true,
    autoplay: true,
    width: "20rem",
  });

  const forgetAnimation = useLottie({
    animationData: forget,
    loop: true,
    autoplay: true,
    width: "20rem",
  });

  const confettiAnimation = useLottie({
    animationData: confetti,
    loop: true,
    autoplay: true,
    width: "20rem",
  });

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    console.log(`감지결과 : ${isIntersecting}`);
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  const router = useRouter();
  const handleLogin = useCallback(() => {
    const restApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    const redirectURI = "http://localhost:3010/auth/kakao/callback";
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectURI}&response_type=code`;

    router.push(kakaoUrl);
  }, [router]);

  return (
    <LandingPageWrapper>
      <LogoWrapper>
        <Image src={Logo} alt="Logo" width={100} height={100}></Image>
      </LogoWrapper>
      <MainSection>
        <span>몽글 몽글은요</span>
        <MonggeulIntro>
          모임을
          <br />
          즐겁게, 편하게!
        </MonggeulIntro>
        <div>{meetingAnimation.View}</div>
        <KakaoLoginButton onClick={handleLogin}>
          카카오로 시작하기
        </KakaoLoginButton>
      </MainSection>
      <MainSection>
        <h1>몽글 몽글</h1>
        <div>{confettiAnimation.View}</div>
        <div>{pumpAnimation.View}</div>
        <div ref={setTarget}></div>
      </MainSection>
      <MainSection>
        <h1>몽글 몽글</h1>
        <div>{forgetAnimation.View}</div>
      </MainSection>
    </LandingPageWrapper>
  );
};

export default LandingPage;
