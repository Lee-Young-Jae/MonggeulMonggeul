const express = require("express");
const router = express.Router();
const passport = require("passport");

const { Group, User } = require("../models");

// 카카오 로그인 http://localhost:3010/auth/kakao/callback
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/groups");
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
      user: req.user,
    });
  }
  res.status(401).send({ message: "로그인이 필요합니다." });
});

module.exports = router;
