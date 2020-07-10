import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Banner } from "../components/Banner";
import { PopOverContainer } from "../components/PopOverContainer";
import { SliderContainer } from "../components/SliderContainer";
import useScore from "../hooks/useScore";
import styled from "styled-components";

const BannerGroup = ({ display, classDisplay, people }) => {
  const PersonBanner = styled(Banner)`
    padding-right: 0;
  `;

  return (
    <div class="banner-group">
      <PopOverContainer display={display}>
        <Banner variant="accent">{classDisplay}</Banner>
      </PopOverContainer>
      <SliderContainer
        display={display}
        direction="left"
        timeout={1000}
        enterDelay={500}
      >
        {people &&
          people.map((person) => (
            <PersonBanner>
              <>
                <b>{person.name}: </b>
                {person.time}
              </>
            </PersonBanner>
          ))}
      </SliderContainer>
    </div>
  );
};

const SessionBanner = ({ display, session }) => {
  const [current, setCurrent] = useState();
  const [changing, setChanging] = useState(false);
  const timeout = 500;

  useEffect(() => {
    setChanging(true);
    setTimeout(() => {
      setChanging(false);
    }, timeout);
  }, [session, setChanging]);

  return (
    <SliderContainer
      display={display && !changing}
      direction="right"
      timeout={timeout}
      enterDelay={0}
      onEntering={() => {
        setCurrent(session);
      }}
      onExited={() => {
        console.log("exited");
        setCurrent(session);
        setChanging(false);
      }}
    >
      <Banner variant="secondary">
        <b>{current}</b>
      </Banner>
    </SliderContainer>
  );
};

const BottomBar = ({ display, score: { session, classDisplay, people } }) => {
  return (
    <div id="bottom-bar">
      <div className="logo-area">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <BannerGroup
        display={display}
        classDisplay={classDisplay}
        people={people}
      />
      <SessionBanner display={display} session={session} />
    </div>
  );
};

export const ScoreBoard = () => {
  const [score] = useScore();

  return (
    <div className="App">
      <BottomBar display={score.display} score={score} />
    </div>
  );
};
