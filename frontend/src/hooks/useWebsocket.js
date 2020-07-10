import { useEffect, useState } from "react";
const useWebsocket = () => {
  const [ws, setWS] = useState(null);

  useEffect(() => {
    if (ws === null) {
      const socket = new WebSocket("ws://172.22.70.68:3030/echo");

      socket.addEventListener("open", () => {
        console.log("open");
        setWS(socket);
      });

      socket.addEventListener("close", () => {
        setWS(null);
      });
    }
  }, [ws]);

  return ws;
};

export default useWebsocket;
