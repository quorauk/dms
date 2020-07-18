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

const DropdownInput = styled.select`
  background-color: #1f1e1f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 3px;
  width: 100%;
  height: max-content;
`

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

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <InputField>
      <InputLabel>{label}</InputLabel>
      <DropdownInput value={value} onChange={(e) => {
        onChange(e.target.value)
      }}>
        {
          options.map(c=> 
            <option value={c} key={c}>{c}</option>
          )
        }
      </DropdownInput>
    </InputField>
  );
};

export const Admin = () => {
  const [score, sendScore, classification] = useScore({ readOnly: false });
  const [session, setSession] = useState("");
  const [classDisplay, setClassDisplay] = useState(null);
  const [classes, setClasses] = useState([null])

  useEffect(() => {
    const updatedClasses = classification.reduce((acc, row) => {
      if (acc.includes(row.PrimaryClass)) {
        return acc
      } else {
        acc.push(row.PrimaryClass)
        return acc
      }
    }, classes)
    setClasses(updatedClasses)
  }, [classification, setClasses, classes])

  useEffect(() => {
    if (score) {
      if (score.session) {
        setSession(score.session);
      }
      if (score.classDisplay !== undefined) {
        setClassDisplay(score.classDisplay);
      }
    }
  }, [score]);

  return (
    <Background>
      <FormRow
        onSubmit={(e) => {
          e.preventDefault();
          sendScore({
            ...score,
            session,
            classDisplay
          });
        }}
      >
        <Input label="session" value={session} onChange={setSession} />
        <Dropdown label="class" value={classDisplay} onChange={setClassDisplay} options={classes}/>
        <Button>Update</Button>
      </FormRow>
    </Background>
  );
};
