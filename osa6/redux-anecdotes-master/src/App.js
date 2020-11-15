import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
const App = () => {
return(
  <div>
    <h2>Anecdotes</h2>
    <NewAnecdote></NewAnecdote>
    <Anecdotes></Anecdotes>
  </div>
)
}

export default App