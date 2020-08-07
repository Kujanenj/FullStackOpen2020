import React from 'react';
import ReactDOM from 'react-dom';

const Header = (param) => {
    console.log(param)
    return (
        <div>
            <h1>{param.course}</h1>
        </div>
    )
}

const Content = (param) => {
    console.log(param)
    return (
        <div>
            <Part partName={param.parts[0].name} partNumber ={param.parts[0].exercises}></Part>
            <Part partName={param.parts[1].name} partNumber ={param.parts[1].exercises}></Part>
            <Part partName={param.parts[2].name} partNumber ={param.parts[2].exercises}></Part>
        </div>
    )
}

const Part = (param) => {
    return (
        <div>
            <p>{param.partName} excercises: {param.partNumber}</p>
        </div>
    )
}

const Total = (param) => {
    console.log(param)
    return (
        <div>
            {param.parts[0].exercises + param.parts[1].exercises + param.parts[2].exercises}
        </div>
    )
}


const App = () => {
    
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
    
        
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));