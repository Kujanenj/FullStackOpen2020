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
          LoginForm(handleLogin,username,setUsername,password,setPassword) :
          <div>
            <p>{user.name} logged in</p>
            <button onClick={logOut}>  logOut
             </button>
             {BlogsForm(blogAuthor,blogUrl,blogTitle,setBlogAuthor,setBlogUrl,setBlogTitle,handleCreateNewBlog)}
            {printBlogs(blogs)}
            
          </div>
        }

      </div>
    </div>
  )
}

export default App