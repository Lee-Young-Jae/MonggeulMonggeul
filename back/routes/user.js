const express = require("express");
const router = express.Router();
const { Group, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

// 유저 프로필 정보 GET http://localhost:3010/user/profile

router.get("/profile", isLoggedIn, (req, res) => {
  const existUser = req.user;
  if (!existUser) {
    return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
  }

  const user = {
    id: existUser.id,
    name: existUser.name,
    email: existUser.email,
    profileImage: existUser.profileImage,
  };

  return res.status(200).json(user);
});

module.exports = router;
