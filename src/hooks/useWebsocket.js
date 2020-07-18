import { useEffect, useState } from "react";
const useWebsocket = () => {
  const [ws, setWS] = useState(null);

  useEffect(() => {
    if (ws === null) {
      const socket = new WebSocket(window.location.origin.replace(/^http/, 'ws') + "/echo")
      // const socket = new WebSocket("ws://localhost:3000/echo")
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
