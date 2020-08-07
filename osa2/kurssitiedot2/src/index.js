import React from "react";
import ReactDOM from "react-dom";
import Course from './Components/Course'

/*const Course = ({ course }) => {
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
*/
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  const testFunction = () =>
    courses.map((coursePart) => (
      <Course
        course={{ name: coursePart.name, parts: coursePart.parts }}
      ></Course>
    ));

  return <div>{testFunction()}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
