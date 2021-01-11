import React from "react";
import ReactDOM from "react-dom";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase, CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartBase, CoursePartWithDescription{
  name: "Fourth",
}
interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}
interface PartsProps {
  courses: CoursePart[];
}
type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

interface SinglePart {
  course: CoursePart;
}

interface HeaderProps {
  courseName: string;
}
const Content: React.FC<PartsProps> = ({ courses }: PartsProps) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.name}>
          <Part course={course}></Part>
        </div>
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
const Part: React.FC<SinglePart> = (props) => {
  switch (props.course.name) {
    case "Fundamentals":
      return (
        <div>
          <p>
            {`${props.course.name} ${props.course.description} ${props.course.exerciseCount}`}
          </p>
        </div>
      );

    case "Using props to pass data":
      return (
        <div>
          <p>
            {`${props.course.name} ${props.course.groupProjectCount} ${props.course.exerciseCount}`}
          </p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>
            {`${props.course.name} ${props.course.description} ${props.course.exerciseSubmissionLink} ${props.course.exerciseCount}`}
          </p>
        </div>
      );
      case "Fourth":
        return (
        <div>
          <p>
            {`${props.course.name} ${props.course.description}  ${props.course.exerciseCount}`}
          </p>
        </div>
      );
    default:
      return assertNever(props.course);
  }
};
const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "Fourth",
      exerciseCount: 1,
      description: "TestDescp"
    }
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
