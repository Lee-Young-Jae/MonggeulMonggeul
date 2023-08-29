const express = require("express");
const router = express.Router();
const passport = require("passport");

// 카카오 로그인 http://localhost:3010/auth/kakao
router.get("/kakao", passport.authenticate("kakao"), (req, res) => {}); // 사용자 인증 요청

// 카카오 로그인 http://localhost:3010/auth/kakao/callback
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/", // 로그인 실패 시 이동할 주소
  }),
  (req, res) => {
    // 성공시
    if (req.user) {
      res.redirect(`${process.env.FRONT_URL}/auth`);
    }

    // 실패시
    else {
      console.log("로그인 실패");
      res.redirect(`${process.env.FRONT_URL}/`);
    }
  }
);

// 카카오 로그아웃 http://localhost:3010/auth/kakao/logout
router.get("/kakao/logout", (req, res) => {
  try {
    const accessToken = req.session.passport.user.accessToken;
    const kakaoUnlinkUrl = `https://kapi.kakao.com/v1/user/unlink`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    fetch(kakaoUnlinkUrl, {
      method: "POST",
      headers,
    }).then((kakaoRes) => {
      req.logout((error) => {
        req.session.destroy();
        if (error) {
          console.error(error);
          throw error;
        } else {
          res.status(200).send({ message: "로그아웃 성공" });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "로그아웃 실패" });
  }
});

// 로그인 여부 확인 http://localhost:3010/auth
router.get("/", (req, res) => {
  if (req.user) {
    return res.status(200).json({
      id: req.user.id,
      nickname: req.user.nickname,
      email: req.user.email,
      // accessToken: req.user.accessToken,
    });
  }
  res.status(401).send({ message: "로그인이 필요합니다." });
});

// 세션 유효성 검사 http://localhost:3010/auth/session
router.get("/session", (req, res) => {
  if (req.user) {
    return res.status(200).json({
      id: req.user.id,
    });
  }
  res.status(401).send({ message: "로그인이 필요합니다." });
});

module.exports = router;
