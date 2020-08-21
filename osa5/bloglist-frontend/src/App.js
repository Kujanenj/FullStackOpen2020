import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from "./components/Notification";
import BlogsForm from "./components/BlogsForm"
import LoginForm from "./components/LoginForm"
import printBlogs from "./components/PrintBlogs"
import "./App.css"

const App = () => {
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
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  const [loginVisible, setLoginVisible] = useState(false)

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    try{
      const newBlog = await 
        blogService.create({
          title: blogTitle,
          author: blogAuthor,
          url: blogUrl,
          user: user
        })
        console.log(newBlog)
        setBlogs(blogs.concat(newBlog))
        handleMessageChange("New blog","add")
      

    }catch(exception){
      handleMessageChange("Bad request or something i guess?",'remove')
    }
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
      handleMessageChange("You did pass!",'add')
    } catch (exception) {
      
      handleMessageChange("You shall not pass!",'remove')
    
    }
  }
 const blogsForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Add Blog </button>
        </div>
        <div style={showWhenVisible}>
       <BlogsForm 
       blogAuthor={blogAuthor}
       blogTitle={blogTitle}
       blogUrl={blogUrl}
       handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
       handleTitleChange={({ target }) => setBlogTitle(target.value)}
       handleUrlChange={({ target }) => setBlogUrl(target.value)}
       handleCreateNewBlog={handleCreateNewBlog}></BlogsForm> 
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const oldUser = JSON.parse(loggedUserJSON)
      setUser(oldUser)
      
      
      blogService.setToken(oldUser.token)
    }
    
  }, [])
 
  
  useEffect(() => {      
    console.log("Trying to use effec")
    console.log("User is")
    console.log(user)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )}
  , [])

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
            {printBlogs(blogs)}
            
          </div>
        }

      </div>
    </div>
  )
}

export default App