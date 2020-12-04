import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificaton } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
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
                  props.displayNotificaton(
                    `You voted ${anecdote.content}`,
                    5000,
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
