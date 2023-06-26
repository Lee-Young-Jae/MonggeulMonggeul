const passport = require("passport");
const KakaoStrategy = require("./kakaoStrategy");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.kakaoId);
  });

  passport.deserializeUser(async (kakaoId, done) => {
    try {
      const exUser = await User.findOne({ where: { kakaoId } });
      done(null, exUser);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  KakaoStrategy();
};
