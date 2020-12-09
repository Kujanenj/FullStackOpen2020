
import {
  BrowserRouter as Router,  Switch, Route, Link
} from "react-router-dom"
import React, { useState } from 'react'
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
          )}
    </ul>
  </div>
)
export default AnecdoteList