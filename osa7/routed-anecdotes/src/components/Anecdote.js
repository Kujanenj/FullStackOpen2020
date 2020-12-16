import React from "react"
const { useParams } = require("react-router-dom")

const Anecdote =  ({anecdotes}) =>{
  
    const id = useParams().id
    console.log(id)
    console.log(anecdotes)
    const anec = anecdotes.find(anecdote => anecdote.id === id)
 
    return(
        <div>
            <h1>{`${anec.content} by ${anec.author}`}</h1>
            has {`has ${anec.votes} votes`}
            <br />
            See  <a href = {anec.info}>{anec.info}</a> for more info
        </div>
    )
}
export default Anecdote