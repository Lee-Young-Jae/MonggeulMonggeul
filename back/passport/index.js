const passport = require("passport");
const KakaoStrategy = require("./kakaoStrategy");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, { id: user.kakaoId, accessToken: user.accessToken });
  });

  passport.deserializeUser(async (user, done) => {
    try {
      const exUser = await User.findOne({
        where: { kakaoId: user.id },
      }).then((data) => {
        data.accessToken = user.accessToken;
        return data;
      });
      done(null, exUser);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  KakaoStrategy();
};
