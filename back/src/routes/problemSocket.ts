export const problemSocket = (socketIo: any) => {
  //   console.log(socketIo);
  socketIo.on("connection", (socket: any) => {
    console.log("소켓 연결 완료");

    socket.on("message", (data: string) => {
      console.log(data);
      socketIo.emit("msg", "lalalalal");
    });
  });
};
