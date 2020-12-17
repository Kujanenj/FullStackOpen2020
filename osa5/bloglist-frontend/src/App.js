import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import PrintBlogs from './components/PrintBlogs'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const logOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const addLikeFunc = async blogObject => {
    blogObject.likes += 1

    const response = await blogService.addLike(blogObject)

    setBlogs(blogs.map(blog => (blog.id === response.id ? response : blog)))

    setBlogs(
      blogs.sort((first, second) => {
        return first['likes'] > second['likes'] ? -1 : 1
      })
    )
  }
  const deleteFunc = async blogObject => {
    await blogService.removeBlog(blogObject)

    setBlogs(blogs.filter(blog => (blog.id !== blogObject.id ? true : false)))
  }

  const createNewBlog = async blogObject => {
    //blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }
  const blogsForm = () => (
    <Togglable buttonLabel="add Blog" ref={blogFormRef}>
      <BlogsForm user={user} createNewBlog={createNewBlog} />
    </Togglable>
  )
  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm setUser={setUser} />
    </Togglable>
  )
  const printBlogs = () => (
    <Togglable buttonLabel="show">
      <PrintBlogs
        blogs={blogs}
        addLikeFunc={addLikeFunc}
        deleteFunc={deleteFunc}
        loggedUser={user}
      ></PrintBlogs>
    </Togglable>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const oldUser = JSON.parse(loggedUserJSON)
      setUser(oldUser)
      blogService.setToken(oldUser.token)
      blogService
        .getAll()
        .then(blogs =>
          setBlogs(
            blogs.sort((first, second) =>
              first['likes'] > second['likes'] ? -1 : 1
            )
          )
        )
    }
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
