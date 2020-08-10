import React, { useState, useEffect } from "react";
import axios from 'axios'
function checkForCollision(myarray, name) {
  for (let i = 0; i < myarray.length; i++) {
    if (myarray[i].name === name) {
      return true;
    }
  }
  return false;
}
function filterNames(persons, name) {
  return persons.filter((person) => person.name.includes(name));
}

const FilterInput = ({ nameFilter, handleFilterChange }) => {
  return (
    <div>
      filter:
      <input value={nameFilter} onChange={handleFilterChange}></input>
    </div>
  );
};
const PersonsForm = ({
  addName,
  newName,
  handleNameChange,
  number,
  handeNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
        <br></br>
        number :<input value={number} onChange={handeNumberChange}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const PrintNames = ({ names, nameFilter }) => {
  return (
    <div>
      {filterNames(names, nameFilter).map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNewNumber] = useState("");
  const [nameFilter, setNewNameFilter] = useState("");
  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }
  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: number,
    };
    if (checkForCollision(persons, newName)) {
      console.log("collision");
    } else {
      console.log("ei osunut");
    }
    
    checkForCollision(persons, newName)
    ? window.alert(newName + " is already in phonebook")
    : setPersons(persons.concat(nameObject));
    setNewName("");
  };
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewNameFilter(event.target.value);
  };
  const handeNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  useEffect(hook,[])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput
        nameFilter={nameFilter}
        handleFilterChange={handleFilterChange}
      ></FilterInput>
      <h2> Add a new </h2>
      <PersonsForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        number={number}
        handeNumberChange={handeNumberChange}
      ></PersonsForm>
      <h2>Numbers</h2>
      <PrintNames names={persons} nameFilter={nameFilter}></PrintNames>
    </div>
  );
};

export default App;
