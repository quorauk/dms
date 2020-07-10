import { useState, useEffect, useCallback } from "react";
import useWebsocket from "./useWebsocket";

const useScore = (props) => {
  const ws = useWebsocket();

  const [scoreString, setScoreString] = useState();
  const [score, setScore] = useState({
    classDisplay: "D Class",
    session: "Practice",
    display: true,
  });

  useEffect(() => {
    if (ws) {
      ws.addEventListener("message", (msg) => {
        setScore(JSON.parse(msg.data));
      });
    }
  }, [ws, setScore]);

  useEffect(() => {
    if (ws && props && props.readOnly === false) {
      const newScoreString = JSON.stringify(score);
      ws.send(newScoreString);
    }
  }, [ws, score, scoreString]);

  return [score, setScore, ws];
};

export default useScore;
