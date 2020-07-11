import React from "react";
import { SideScore } from "../components/SideScore";
import useScore from "../hooks/useScore";

export const ScoreBoard = () => {
  const [score, ,classification] = useScore();

  return (
    <div className="App">
      <SideScore classification={classification} score={score}/>
      {/* <BottomBar display={score.display} score={score} /> */}
    </div>
  )
};
