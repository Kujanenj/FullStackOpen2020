import React, { useState } from "react";
import ReactDOM from "react-dom";

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

const ShowMostVoted = ({ points, anecdotes }) => {
  var anecdote = anecdotes[indexOfMax(points)];
  return (
    <div>
      <h1>Most wanted</h1>
      {anecdote}
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}> {text}</button>;
};
const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0));

  const HandleNextClick = () => {
    setSelected(Math.floor(Math.random() * 6));
    console.log(selected);
  };
  const HandleVoteClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    console.log(points, "alkuperäinen");
    console.log(copy, "kopio");
    setPoints(copy);
  };
  return (
    <div>
      {props.anecdotes[selected]} <br></br>
      <Button onClick={HandleNextClick} text="Next"></Button>
      <Button onClick={HandleVoteClick} text="Vote"></Button>
      <ShowMostVoted
        points={points}
        anecdotes={props.anecdotes}
      ></ShowMostVoted>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
