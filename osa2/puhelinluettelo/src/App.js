import React, { useState, useEffect } from "react";
import axios from 'axios'
import PersonsService from './services/Persons'



function checkForCollision(myarray, name) {
  for (let i = 0; i < myarray.length; i++) {
    if (myarray[i].name === name) {
      return myarray[i]
    }
  }
  return null
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

const PrintNames = ({ persons, nameFilter , handleDeleteButton}) => {
  return (
    <div>
      {filterNames(persons, nameFilter).map((person) => (
        <li key={person.name}>
          {person.name} {person.number} <button onClick = {() => handleDeleteButton(person.id)}>del</button>
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
  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: number,
    };
    
    var collisionResult = checkForCollision(persons, newName)
    if(collisionResult!= null){
        handleNumberChange(collisionResult,number)
    }
    else{
      PersonsService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons
          .concat(returnedPerson))})
          setNewName('')
    }
  };
  const handleNumberChange =(personToUpdate,newNumber) =>{
    if (window.confirm("Do you really want to update?")){
        PersonsService.update(personToUpdate.id,{...personToUpdate, number: newNumber}).then(response =>{
          setPersons(persons.map(person => person.id === personToUpdate.id ? response : person))
        }
        )
    }
  }
  const handleDeleteButton =(id) =>{
    if (window.confirm("Do you really want to del?")) { 
        PersonsService.remove(id).then(response =>{
        setPersons(persons.filter(person => person.id != id))
        })
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewNameFilter(event.target.value);
  };
  const handeNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  useEffect(() =>{
    PersonsService.getAll().then(people =>{
      setPersons(people)
    })
  },[])

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
      <PrintNames persons={persons} nameFilter={nameFilter}handleDeleteButton = {handleDeleteButton}></PrintNames>
    </div>
  );
};

export default App;
