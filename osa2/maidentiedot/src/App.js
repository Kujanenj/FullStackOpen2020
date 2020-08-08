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
const PrintFlag=({Flag}) =>{
  return(
    <img src={Flag} width="300" height="200"></img>
  )
}
const PrintLanguages = ({languages}) =>{
  return (
    <div>
    <h2>Languages</h2>
   {languages.map((language) =>(<li key = {language.name}> {language.name}</li>))}
  </div>
  )
}
const PrintSingleCountry  = ({country}) =>{
  return (
    <div>
    <h1> {country.name}</h1>
    
    Capital {country.capital} <br></br>
 
    Population {country.population}<br></br>
    <PrintLanguages languages = {country.languages}></PrintLanguages>
    <PrintFlag Flag={country.flag}></PrintFlag>
    </div>
  )
}
const PrintCountries = ({ countries, filterString }) => {

  var filteredCountries = filterCountries(countries, filterString)
  if(filteredCountries[0]!=undefined){
    if(filteredCountries.length===1){
      return(
      <PrintSingleCountry country={filteredCountries[0]}>

      </PrintSingleCountry>)
    }
    if(filteredCountries.length < 10){
      console.log("Less than 10")
      return (
        <div>
          {filteredCountries.map((country) => (<li key={country.name}>{country.name} </li>))}
      </div>
    )
  }
  else{
    return <div>too many</div>
  }
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
