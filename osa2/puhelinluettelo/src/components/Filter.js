import React from 'react'


const Filter = ({setFilter}) => {
  const handleFilterChange = (event) => {
    const filter = event.target.value
    filter === "" 
      ? setFilter(null) 
      : setFilter(filter)
  }

  return (
    <>
    <p>Filter shown with</p>
    <input
      onChange={handleFilterChange}
    />
    </>
  )
}

export default Filter
