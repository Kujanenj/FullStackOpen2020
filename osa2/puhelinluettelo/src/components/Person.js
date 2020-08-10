import React from 'react'


const Person = ({name,number,handleRemoveEvent}) => {
  return (
    <li>{name}: {number} 
      <button onClick={handleRemoveEvent}>Remove</button>
    </li>
  )
}

export default Person
