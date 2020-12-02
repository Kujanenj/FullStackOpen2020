import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  displayNotificaton,
  hideNotification,
} from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  let anecdotes = useSelector((state) => state.anecdotes)
  if (filter !== '') {
    anecdotes = anecdotes.filter((anecdote) => {
      return anecdote.content.includes(filter)
    })
  }
  const vote = (id) => {
    return {
      type: 'VOTE',
      data: { id },
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort(function (a, b) {
          return b.votes - a.votes
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  dispatch(vote(anecdote.id))
                  dispatch(displayNotificaton(`You voted ${anecdote.content}`))
                  setTimeout(() => {
                    dispatch(hideNotification())
                  }, 5000)
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}
export default Anecdotes
