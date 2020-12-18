import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import './App.css'
import { initblogs } from './reducers/blogsReducer'

const App = () => {
  console.log('RENDER')
  const dispatch = useDispatch()
  console.log(initblogs)
  useEffect(() => {
    dispatch(initblogs())
  }, [dispatch])
  console.log('????')
  //const blogFormRef = useRef()
  const logOut = () => {
    window.localStorage.removeItem('loggedUser')
    //setUser(null)
  }
  const [user, setUser] = useState(null)
  // const [blogs, setBlogs] = useState([])
    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm setUser={setUser} />
      </Togglable>
    )
  return (
    <div>
      <Notification></Notification>

      <div>
        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p>{user.name} logged in</p>
            <button onClick={logOut}> logOut</button>
            <BlogList></BlogList>
            <BlogsForm user={user}></BlogsForm>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
