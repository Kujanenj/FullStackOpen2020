import React from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"
import AnecdoteList from './AnecdoteList'
import CreateNew from "./CreateNew"
import Anecdote from "./Anecdote"
import About from './About'

  const Menu = ({anecdotes,addNew}) => {
  
    const padding = {
      padding: 5
    }
  
    return (
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/create">create</Link>
          
        </div>
  
        <Switch>
          <Route path="/create">
          <CreateNew addNew={addNew} />
          </Route>
          <Route path = "/anecdotes/:id">
            <Anecdote anecdotes = {anecdotes}></Anecdote>
          </Route>
          <Route path="/">
         <AnecdoteList anecdotes ={anecdotes}></AnecdoteList>
         <About></About>
          </Route>
        </Switch>

      </Router>
    )
  }
  export default Menu