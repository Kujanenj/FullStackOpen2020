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
const PrintwheatherData = ({country,data}) =>{

  console.log(data)
  if(country!=undefined && data.current!=undefined){
    
    return(
      <div>
        <h1>Wheater in {country.capital}</h1>
        <br></br>
        Temp : {data.current.temp_c}
        <br></br>
        Condition : {data.current.condition.text}
            </div>
    )
  }
  else{
    return null
  }
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

const PrintCountries = ({ filteredCountries}) => {
  if(filteredCountries[0]!=undefined){
    if(filteredCountries.length===1){
      return(
        <div>
      <PrintSingleCountry country={filteredCountries[0]}>
      </PrintSingleCountry>
      </div>)
    }

    if(filteredCountries.length < 10){
      console.log("Less than 10")
      return (
        <div>
          {filteredCountries.map((country) => (<li key={country.name}>{country.name}</li>))}
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
  const [wheatherData, setwheatherData] = useState([])
 
  const countryHook = () => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }
  const handleFilterChange = (event) => {
    setNewNameFilter(event.target.value);
    
  };
  var singleCountry
  var filteredCountries = filterCountries(countries,filterString)
  if(filteredCountries.length===1){

   singleCountry =  filteredCountries[0]
  }
  useEffect(countryHook,[])
  const weatherHook = () =>{
    if(singleCountry!=undefined){
    axios.get("http://api.weatherapi.com/v1/current.json?key=fceec26d378b4612b15120546200908&q="+singleCountry.capital)
    .then(response =>{
      if(singleCountry!=undefined){
      console.log(singleCountry.capital)
      }
      console.log(response.data.current.temp_c)
      setwheatherData(response.data)
    })
  }
}
  useEffect(weatherHook,[singleCountry])

  return (
    <div>
     <FilterInput
        filterString={filterString}
        handleFilterChange={handleFilterChange}>
        </FilterInput>
        
      <PrintCountries filteredCountries={filteredCountries}></PrintCountries>
      <PrintwheatherData country={singleCountry} data={wheatherData}></PrintwheatherData>
  </div>
  )
}

export default App;
