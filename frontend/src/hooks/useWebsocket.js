import { useEffect, useState } from "react";
const useWebsocket = () => {
  const [ws, setWS] = useState(null);

  useEffect(() => {
    if (ws === null) {

      const socket = new WebSocket("ws://localhost:3030/echo"); 
      socket.addEventListener("open", () => {
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
