const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_KEY,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("profile", profile);
          // 인가 code
          console.log("accessToken", accessToken);

          const exUser = await User.findOne({
            where: { kakaoId: profile.id },
          });
          if (exUser) {
            exUser.accessToken = accessToken;
            done(null, exUser);
          } else {
            const newUser = await User.create({
              name: profile.displayName,
              email: profile._json && profile._json.kakao_account.email,
              kakaoId: profile.id,
              profileImage:
                profile._json && profile._json.properties.profile_image,
            });

            newUser.accessToken = accessToken;
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
