import React from 'react'
const Course = ({ course }) => {
    const part = course.parts.map((part) => (
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>
    ));
    const total = course.parts.reduce((total, part) => {
      return total + part.exercises;
    }, 0);
  
    return (
      <div>
        <Header header={course.name}></Header>
        {part}
        <p>Total of {total} exercises</p>
      </div>
    );
  };
  
  const Header = ({ header }) => {
    return (
      <div>
        <h1>{header}</h1>
      </div>
    );
  };

  export default Course