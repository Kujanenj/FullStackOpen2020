import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/AnecdoteFilter'

import { initAnecdotes } from './reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {    dispatch(initAnecdotes())   },[dispatch]) 
  return (
    <div>
      <Filter></Filter>
      <Notification></Notification>
      <NewAnecdote></NewAnecdote>
      <Anecdotes></Anecdotes>
    </div>
  )
}

export default App