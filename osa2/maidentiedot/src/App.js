import React, { useState, useEffect } from "react";
import axios from 'axios'

const FilterInput = ({ filterString, handleFilterChange}) => {
  return (
    <div>
      filter:
      <input value={filterString} onChange={handleFilterChange}></input>
    </div>
  );
};
function filterCountries(countriesToFilter, filterString) {
  return countriesToFilter.filter((country) => country.name.includes(filterString));
}
const PrintCountries = ({ countries, filterString }) => {
  var filteredCountries = filterCountries(countries, filterString)
  console.log(filterCountries(countries, filterString))
  console.log(filteredCountries[0])
  return(
    <div>
      filteredCountries[0].name
    </div>
  )
  if(filteredCountries.lenght < 10){
  return (
    <div>
        {filteredCountries.map((country) => (
        <li key={country.name}>
          {console.log(country.name)}
        </li>
      ))}
    </div>
  )
}
else{
  return <div>too many</div>
}
};
function App() {
  const [countries, setCountries] = useState([]);
  const [filterString, setNewNameFilter] = useState("");
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }
  const handleFilterChange = (event) => {
    setNewNameFilter(event.target.value);
    
  };
  useEffect(hook,[])
  return (
  <div>
     <FilterInput
        filterString={filterString}
        handleFilterChange={handleFilterChange}
      ></FilterInput>
      <PrintCountries countries={countries} filterString={filterString}></PrintCountries>
  </div>)
}

export default App;
