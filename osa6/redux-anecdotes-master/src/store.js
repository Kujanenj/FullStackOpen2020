import anecdoteReducer from './reducers/anecdoteReducer'
import { createStore, combineReducers } from 'redux'
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"
const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
})
const Store = createStore(reducer)
export default Store;