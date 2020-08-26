import React, { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import Notification from "./components/Notification";
import BlogsForm from "./components/BlogsForm"
import LoginForm from "./components/LoginForm"
import PrintBlogs from "./components/PrintBlogs"
import "./App.css"

const App = () => {
  const blogFormRef = useRef()
  const logOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const [currentNotification, setCurrentNotification] = useState({
    message: null,
    style: "nada",
  });
  const handleMessageChange = (msg, styl) => {
    setCurrentNotification({ message: msg, style: styl });
    setTimeout(() => {
      setCurrentNotification({ msg: null, style: "uusi" });
    }, 4000);
  };
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])


  const addLikeFunc = async (blogObject) => {
    console.log(blogObject.likes)
    blogObject.likes += 1
    console.log(blogObject.likes)
    const response = blogService.addLike(blogObject)

    setBlogs(blogs.map(blog => blog.id === response.id ? response : blog))
  }
 
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      handleMessageChange("You did pass!", 'add')
    } catch (exception) {

      handleMessageChange("You shall not pass!", 'remove')

    }
  }
  const createNewBlog = async (blogObject) => {
    //blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }
  const blogsForm = () => (
    <Togglable buttonLabel="add Blog" ref={blogFormRef}>
      <BlogsForm user={user}
        createNewBlog={createNewBlog} />
    </Togglable>

  )
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  const printBlogs = () => (
      < Togglable buttonLabel = "show" >
      <PrintBlogs blogs={blogs} addLikeFunc={addLikeFunc}></PrintBlogs>
    </Togglable >
  )

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const oldUser = JSON.parse(loggedUserJSON)
    setUser(oldUser)


    blogService.setToken(oldUser.token)
  }

}, [])


useEffect(() => {
  blogService.getAll().then(blogs =>
    setBlogs(blogs)
  )
}
  , [])
  useEffect(()=>{
    console.log("***************")
   setBlogs(blogs.sort((first,second)=> first['likes']>second['likes']))
  },[blogs])

return (
  <div>
    <Notification
      message={currentNotification.message}
      style={currentNotification.style}
    ></Notification>
    <div>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logOut}>  logOut
             </button>
          {blogsForm()}
          {printBlogs()}

        </div>
      }

    </div>
  </div>
)
}

export default App