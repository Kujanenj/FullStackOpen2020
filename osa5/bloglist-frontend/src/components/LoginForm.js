import React from 'react'
import loginService from '../services/login'
import blogService from "../services/blogs"
import { connect } from 'react-redux'
import {
  displayNotificaton,
} from '../reducers/notificationReducer'
const LoginForm = (props) => {

  const handleLogin = async event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
     event.target.password.value=''
     event.target.username.value=''
    try {
      const user = await loginService.login({
        username,
        password 
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
         props.displayNotificaton(`You logged in as ${username}`, 1000)
      blogService.setToken(user.token)
      props.setUser(username)
  }catch(err){
    console.log(err)
    props.displayNotificaton(`You failed to login`, 1000)
  }
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input name="username"/>
        </div>
        <div>
          password
          <input
            name="password"
      
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
export default connect(null, {displayNotificaton })(LoginForm)