import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from "./components/Notification";
import BlogsForm from "./components/BlogsForm"
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
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const oldUser = JSON.parse(loggedUserJSON)
      setUser(oldUser)
      
      
      blogService.setToken(oldUser.token)
    }
    
  }, [])
  /*  if(user != null){
    blogService.setToken(user.token)
  }*/
  
  useEffect(() => {      
    console.log("Trying to use effec")
    console.log("User is")
    console.log(user)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )}
  , [])
  const printBlogs = () => (
    
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
  
  const loginForm = () => (
    <div>
      <h1>PLox log in</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
    <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
    <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

    </div>
  )
  

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
             {BlogsForm(blogAuthor,blogUrl,blogTitle,setBlogAuthor,setBlogUrl,setBlogTitle,handleCreateNewBlog)}
            {printBlogs()}
            
          </div>
        }

      </div>
    </div>
  )
}

export default App