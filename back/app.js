require("dotenv").config();

const express = require("express");
const app = express();

const groupRouter = require("./routes/group");
const authRouter = require("./routes/auth");
const pollRouter = require("./routes/poll");
const appointmentRouter = require("./routes/appointment");
const userRouter = require("./routes/user");
const socket = require("./socket");

// const port = 3010;
const port = process.env.PORT || 3010;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const passport = require("passport");
const passportConfig = require("./passport");
passportConfig(); // passport 설정

app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // url 파싱

// cors 설정
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true, // 프론트로 쿠키 전달
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie-parser 설정
app.use(
  session({
    // express-session 설정
    saveUninitialized: false, // 세션을 저장하기 전에 uninitialized 상태로 미리 만들어서 저장
    resave: false, // 세션을 항상 저장할 지 여부
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // passport 세션 연결

app.use("/group", groupRouter);
app.use("/auth", authRouter);
app.use("/poll", pollRouter);
app.use("/appointment", appointmentRouter);
app.use("/user", userRouter);

// 서버 기본 GET
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 데이터베이스 연결
require("./models")
  .sequelize.sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

//서버 실행
const server = app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
// socket.io 연결
socket(server, app);
