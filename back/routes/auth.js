const express = require("express");
const router = express.Router();
const passport = require("passport");

const { Group, User } = require("../models");

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect(process.env.FRONT_URL);
  }
);

module.exports = router;
