import anecdoteReducer , {initAnecdotes} from './reducers/anecdoteReducer'
import { createStore, combineReducers } from 'redux'
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"
import anecdoteService from './services/anecdote'
const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
})

const Store = createStore(reducer)
console.log("What")
anecdoteService.getAll().then(anecdotes=>{
    console.log(":::DDD")
    Store.dispatch(initAnecdotes(anecdotes))
})


export default Store;