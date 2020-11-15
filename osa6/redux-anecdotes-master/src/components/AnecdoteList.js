import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


    const Anecdotes =()=>{
        
        const dispatch = useDispatch()
        const anecdotes = useSelector(state => state)
        
        const vote = (id) => {
            console.log('vote', id)
            return  {
                type : "VOTE",
                data: {id}
            }
        }
        
        return(
            <div>
  <h2>Anecdotes</h2>
      {anecdotes.sort(function(a,b){
          return b.votes - a.votes
        }).map(anecdote =>
            <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      </div>
      )
    }
    export default Anecdotes