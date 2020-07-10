import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useScore from "../hooks/useScore";

const Background = styled.div`
  background-color: #3a393a;
  width: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  padding: 4px;
`;

const Button = styled.button`
  background-color: #4c4c4c;
  max-height: 20px;
  border-radius: 4px;
  border: none;
  color: white;
  width: 100%;
  margin: 3px auto;
  flex-grow: 1;
`;

const InputText = styled.input`
  background-color: #1f1e1f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 3px;
  width: 100%;
  height: max-content;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 4px;
`;

const InputLabel = styled.label`
  color: white;
  margin: 0 10px;
`;

const FormRow = styled.form``;

const Input = ({ label, value, onChange }) => {
  return (
    <InputField>
      <InputLabel>{label}</InputLabel>
      <InputText
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </InputField>
  );
};

export const PeopleForm = ({ people, setPeople, setScore }) => {
  const AddPerson = () => {
    setPeople([...people, {}]);
  };

  const EditPerson = (id, person) => {
    console.log(person);
    people[id] = person;
    console.log(people);
    setPeople(people);
  };

  const Person = ({ index, person }) => {
    const [pState, setPstate] = useState(person);

    useEffect(() => {
      EditPerson(index, pState);
    }, [pState, index]);

    return (
      <>
        <Input
          label="name"
          value={pState.name}
          onChange={(name) => {
            setPstate((prevState) => ({ ...prevState, name }));
          }}
        />
        <Input
          label="time"
          value={pState.time}
          onChange={(time) => {
            setPstate((prevState) => ({ ...prevState, time }));
          }}
        />
        <Button
          type="button"
          onClick={() => {
            setPeople(Object.entries(people).filter(([i]) => index !== i));
          }}
        >
          Delete
        </Button>
      </>
    );
  };

  return (
    <FormRow
      onSubmit={(e) => {
        e.preventDefault();
        setScore((prevState) => ({
          ...prevState,
          people: people,
        }));
      }}
    >
      {Object.entries(people).map(([index, person]) => (
        <div>
          <Person index={index} person={person} />
        </div>
      ))}
      <Button type="button" onClick={AddPerson}>
        Add person
      </Button>
      <Button type="submit">Update People</Button>
    </FormRow>
  );
};

export const Admin = () => {
  const [score, setScore] = useScore({ readOnly: false });
  const [session, setSession] = useState("");
  const [people, setPeople] = useState([]);
  const [classDisplay, setClassDisplay] = useState("");

  useEffect(() => {
    if (score) {
      if (score.session) {
        setSession(score.session);
      }
      if (score.classDisplay) {
        setClassDisplay(score.classDisplay);
      }
      if (score.people) {
        setPeople(score.people);
      }
    }
  }, [score]);

  return (
    <Background>
      <FormRow
        onSubmit={(e) => {
          e.preventDefault();
          setScore({
            ...score,
            session,
          });
        }}
      >
        <Input label="session" value={session} onChange={setSession} />
        <Button type="submit">Update Session</Button>
      </FormRow>
      <FormRow
        onSubmit={(e) => {
          e.preventDefault();
          setScore({
            ...score,
            classDisplay,
          });
        }}
      >
        <Input label="class" value={classDisplay} onChange={setClassDisplay} />
        <Button>Update Class</Button>
      </FormRow>
      <PeopleForm people={people} setPeople={setPeople} setScore={setScore} />
      <Button
        onClick={() => {
          setScore((prevState) => ({
            ...score,
            display: !prevState.display,
          }));
        }}
      >
        Hide
      </Button>
    </Background>
  );
};
