import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ScoreRow = styled.div`
    display: flex;
`

const Position = styled.span`
    margin-right: 0.5rem;
    background-color: white;
    border-bottom-right-radius: 25%;
    color: black;
    height: 30px;
    display: flex;
    width: 30px;
    justify-content: center;

    p {
      margin: auto auto;
    }
`

const Name = styled.span`
    flex-grow: 1;
    margin: auto 0;
`

const Header = styled.div`
    background-color: #171b21;
    display: flex;
    font-weight: bold;
    width: 250px;
    flex-direction: column;
    padding: 0.5rem;
`

const Session = styled.span`
    flex-grow: 1;
    margin-left: auto;
    margin-right: auto;
`

const CurrentClass = styled.span`
`

const SideBar = styled.div`
    color: white;
    font-family: "Assistant";
    position: absolute;
    left: 0;
    top: 5%;
    font-weight: bold;
  }
`

const CoreData = styled.div`
    width: 250px;
    background-color: #171b21;
    padding: 0.5em;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    display: flex;
`

const Time = styled.div`
    background-color: rgba(8%, 8%, 12%, 50%);
    min-width: 100px;
    display: flex;
    padding: 0.5em;
    justify-content: flex-end;

    p {
      margin: auto 0;
    }
`

export const SideScore = ({ classification, score }) => {
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState([])

  useEffect(() => {
    if (score) {
      if (score.classDisplay === null || score.classDisplay === "") {
        setCurrentlyDisplayed(classification.sort((a, b) => a.Pos - b.Pos))
      } else {
        setCurrentlyDisplayed(classification.filter((row) =>
          row.SubClass === score.classDisplay
        ).sort((a, b) => a.PIC - b.PIC).slice(0, 20))
      }
    }
  }, [classification, setCurrentlyDisplayed, score, score.classDisplay])

  return <SideBar>
    <Header>
        <Session>{score.session}</Session>
        {score.classDisplay && <CurrentClass>Class: {score.classDisplay}</CurrentClass>}
    </Header>
    {currentlyDisplayed.map((c) =>
      <ScoreRow>
        <CoreData>
            <Position><p>{score.classDisplay === null | score.classDisplay === "" ? c.Pos : c.PIC}</p></Position><Name>{c.Name}</Name>
        </CoreData>
        <Time><p>{c.CurrentSessionBest}</p></Time>
      </ScoreRow>
    )}
  </SideBar>
}
