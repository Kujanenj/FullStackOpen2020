import anecdoteService from '../services/anecdote'
export const createAnecdote = (content) => {
    return async dispatch=>{
        const newAnec = await anecdoteService.createNew(content)

        dispatch({
            type: 'NEW_ANECDOTE',
            data : newAnec
        })
    }
}
export const initAnecdotes = ()=>{

    return async dispatch =>{
        console.log("init ")
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type : 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}
export const voteAnecdote = (content)=>{
    return async dispatch=>{
        
  await anecdoteService.update({...content,votes: content.votes +1})
  dispatch({
      type: "VOTE",
      data : content
  })
    }
}
const anecdoteReducer = (state = [], action) => {

    switch (action.type) {
        case 'VOTE':
            const id = action.data.id
            const anecdoteToChange = state.find(n => n.id === id)
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes += 1
            }
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            )
        case 'NEW_ANECDOTE':
            return [...state, action.data]
            case 'INIT_ANECDOTES' :
                console.log("look",action.data)
            return action.data
        default:
            return state
    }
}

export default anecdoteReducer