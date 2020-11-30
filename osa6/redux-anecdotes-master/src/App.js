import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/AnecdoteFilter'
const App = () => {
return(
  <div>
    <Filter></Filter>
    <Notification></Notification>
    <NewAnecdote></NewAnecdote>
    <Anecdotes></Anecdotes>
  </div>
)
}

export default App