import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import notificationReducer from "./reducers/notificationReducer"
const reducer = combineReducers({
    notifications: notificationReducer,
})
console.log("--->",notificationReducer)
console.log("******>",reducer)
const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))



export default store;