import React, { useState, useEffect } from "react";
import PhoneService from "./services/Phone";
import PersonsForm from "./components/PersonsForm";
import Filter from "./components/Filter";
import Person from "./components/Person";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState(null);
  const [currentNotification, setCurrentNotification] = useState({
    message: null,
    style: "nada",
  });

  useEffect(() => {
    PhoneService.getAll().then((response) => setPersons(response));
  }, []);
  const handleMessageChange = (msg, styl) => {
    setCurrentNotification({ message: msg, style: styl });
    setTimeout(() => {
      setCurrentNotification({ msg: null, style: "uusi" });
    }, 4000);
  };
  const filteredPersons = persons.filter((person) => {
    // if filter is empty, return all names
    if (filter === null) return true;
    else {
      return person.name.toLowerCase().includes(filter.toLowerCase())
        ? true
        : false;
    }
  });

  const deletePerson = (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${
          persons.find((p) => p.id === id).name
        }?`
      )
    ) {
      PhoneService.remove(id).then(
        setPersons(persons.filter((person) => person.id !== id))
        );
        handleMessageChange("Removed","remove")
    }
  };
  console.log(currentNotification);
  return (
    <div>
      <Notification
        message={currentNotification.message}
        style={currentNotification.style}
      ></Notification>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>Add new</h2>
      <PersonsForm
        persons={persons}
        setPersons={setPersons}
        handleMessageChange={handleMessageChange}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            handleRemoveEvent={() => deletePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
