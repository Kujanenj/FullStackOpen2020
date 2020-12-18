import React, { useState, useEffect } from 'react'
import { useDispatch ,connect} from 'react-redux'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import {initialUser, logOut} from "./reducers/userReducer"
import './App.css'
import { initblogs } from './reducers/blogsReducer'
import store from './store'

const App = (props) => {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initblogs())
  }, [dispatch])

  // const [blogs, setBlogs] = useState([])
  const loginForm = () => (
    <Togglable buttonLabel="login">
        <LoginForm/>
      </Togglable>
    )
    let user = props.user
    console.log(user)
    console.log(user === null,"null")
    console.log(user === undefined,"undef")
    return (
      <div>
      <Notification></Notification>

      <div>
        {user===null ? (
          loginForm()
          ) : (
            <div>
            <p>{user.name} logged in</p>
            <button onClick={() =>props.logOut()}> logOut</button>
            <BlogList></BlogList>
            <BlogsForm></BlogsForm>
          </div>
        )}
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return { user: state.user }
}
export default connect(mapStateToProps,{logOut,initialUser})(App)
