const SocketIO = require("socket.io");

module.exports = (server, app) => {
  // const io = SocketIO(server, { path: "/socket.io" });
  const io = SocketIO(server, {
    cors: {
      origin: process.env.FRONT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // 라우터에서 io 객체를 쓸 수 있게 저장
  app.set("io", io);

  // 웹소켓 연결 시
  io.on("connection", (socket) => {
    const req = socket.request;
    console.log("새로운 클라이언트 접속", socket.id, req.ip);

    // 룸에 가입
    socket.on("join", (data) => {
      socket.join(data.roomId);
      console.log("유저가", data.roomId, "에 접속했습니다.");
      data.type = "join";
      data.message = `${data.userName}님이 입장하셨습니다.`;
      io.to(data.roomId).emit("joinedUser", data);
    });

    // 채팅 시
    socket.on("chat", (data) => {
      const now = new Date();
      data.time = `${now.getHours()}:${now.getMinutes()}`;
      data.type = "chat";
      io.to(data.roomId).emit("chat", data);
    });

    // 연결 종료 시
    socket.on("leave", (data) => {
      data.type = "disconnect";
      data.message = `${data.userName}님이 퇴장하셨습니다.`;
      console.log("연결 종료", data.userName, data.roomId);
      io.to(data.roomId).emit("leavedUser", data);
      socket.leave(data.roomId);
    });

    socket.on("disconnect", (data) => {
      console.log("클라이언트 접속 해제", socket.id);
    });
  });
};
