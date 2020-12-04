import React from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdote'
import {
  displayNotificaton,
  hideNotification,
} from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.displayNotificaton(`You added ${content}`, 1000)
  }
  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}
export default connect(null, { createAnecdote,displayNotificaton })(NewAnecdote)
