import React from "react";
import ReactDOM from "react-dom";
interface Part {
  name: string;

  exerciseCount: number;
}
interface PartsProps {
  courses: Part[];
}

interface HeaderProps {
  courseName: string;
}
const Content: React.FC<PartsProps> = ({ courses }: PartsProps) => {
  return (
    <div>
      {courses.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};
const Header: React.FC<HeaderProps> = (props) => {
  return <div>{props.courseName}</div>;
};
const Total: React.FC<PartsProps> = (props) => {
  const total = props.courses.reduce((acc, course) => {
    return acc + course.exerciseCount;
  }, 0);
  return <div>{total}</div>;
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courses={courseParts}></Content>
      <Total courses={courseParts}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
