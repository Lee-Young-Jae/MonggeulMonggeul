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

    // 채팅 시

    const roomId = socket.handshake.query.roomId;

    socket.on("chat", (data) => {
      console.log(data);
      // io.to(roomId).emit("chat", data);
      const now = new Date();
      data.time = `${now.getHours()}:${now.getMinutes()}`;
      io.emit("chat", data);
    });

    // 연결 종료 시
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });
};
