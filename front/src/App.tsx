import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

function App() {
  const socket = io("http://localhost:3001");

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("message", "Hello!");
    });
  }, [socket]);

  return (
    <div className="App">
      <Link to="/problemList">코딩테스트</Link>
    </div>
  );
}

export default App;
