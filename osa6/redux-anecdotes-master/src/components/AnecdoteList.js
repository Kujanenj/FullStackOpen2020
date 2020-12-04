import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificaton } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
  const dispatch = useDispatch()
  let anecdotes = props.anecdotes
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
                  props.voteAnecdote(anecdote)
                  dispatch(
                    displayNotificaton(`You voted ${anecdote.content}`, 1000),
                  )
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
const mapStateToProps = (state) => {
  if (state.filter === '') {
    return { anecdotes: state.anecdotes }
  }
  return {
    anecdotes: state.anecdotes.filter((anecdote) => {
      return anecdote.content.includes(state.filter)
    }),
  }
}
const mapDispatchToProps = { voteAnecdote, displayNotificaton }
const connectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Anecdotes)
export default connectedAnecdotes
//export default Anecdotes
