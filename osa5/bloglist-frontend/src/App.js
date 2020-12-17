import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import PrintBlogs from './components/PrintBlogs'
import './App.css'

const App = () => {
  console.log("RENDER")
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const logOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])


  const blogsForm = () => (
    <Togglable buttonLabel="add Blog" ref={blogFormRef}>
      <BlogsForm user={user} blogs={blogs} setBlogs={setBlogs} />
    </Togglable>
  )
  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm setUser={setUser} />
    </Togglable>
  )
  const printBlogs = () => (
    <Togglable buttonLabel="show">
      <PrintBlogs blogs={blogs} setBlogs={setBlogs} user={user}></PrintBlogs>
    </Togglable>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const oldUser = JSON.parse(loggedUserJSON)
      setUser(oldUser)
      blogService.setToken(oldUser.token)
    }
      blogService
        .getAll()
        .then(blogs =>
          setBlogs(
            blogs.sort((first, second) =>
              first['likes'] > second['likes'] ? -1 : 1
            )
          )
        )
  }, [])
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
            {blogsForm()}
            {printBlogs()}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
