import React, {useState} from 'react'
import PhoneService from '../services/Phone'


const PersonsForm = ({persons,setPersons,handleMessageChange}) => {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const handleNameChange = (event) => {
      setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value);
    };
    const addName = (event) => {
      event.preventDefault();
      const newPersonObject = {
        name: newName,
        number: newNumber,
      };
    
      var collisionResult = persons.find(person => person.name ===newPersonObject.name)
      if (collisionResult != null) {
        if (window.confirm("Do you really want to update "+newName+"?")){
          PhoneService.update(collisionResult.id,newPersonObject).then(response =>{
            setPersons(persons.map(person => person.id===collisionResult.id ? response : person))
          })
          handleMessageChange("Updated","update")
        }
      } else {
        PhoneService.create(newPersonObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          handleMessageChange("New person added","add")
        });
        
      }
    };
    return (
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
          <br></br>
          number :<input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };
  export default PersonsForm