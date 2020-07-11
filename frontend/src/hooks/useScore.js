import { useEffect, useState } from "react";
import useWebsocket from "./useWebsocket";

const useScore = (props) => {
  const ws = useWebsocket();

  const [score, setScore] = useState({
    // classDisplay: "D Class",
    // session: "Practice",
    display: true,
  });

  const [classification, setClassification] = useState([])

  useEffect(() => {
    if (ws) {
      ws.addEventListener("message", (msg) => {
        const data = JSON.parse(msg.data)
        if (data.scoreboardState) {
          setScore(data.scoreboardState);
        }
        if (data.classification) {
          setClassification(
            data.classification
          );
        }
      });
    }
  }, [ws, setScore, setClassification]);

  const sendScore = (score) => {
    const newScoreString = JSON.stringify(score);
    ws.send(newScoreString);
  }

  return [score, sendScore, classification, setClassification];
};

export default useScore;
