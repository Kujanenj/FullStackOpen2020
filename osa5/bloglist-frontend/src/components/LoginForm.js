import React, { useEffect }from 'react'
import blogService from '../services/blogs'
import userService from "../services/user"
import { connect, useDispatch } from 'react-redux'
import { displayNotificaton } from '../reducers/notificationReducer'
import { logIn } from '../reducers/userReducer'
import { Table, Form, Button } from 'react-bootstrap'
const LoginForm = props => {
  const dispatch = useDispatch()
  //Check if already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const oldUser = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'SET',
        data: oldUser
      })
      blogService.setToken(oldUser.token)
      userService.setToken(oldUser.token)
    }
  }, [dispatch])
  const handleSubmit = async event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.password.value = ''
    event.target.username.value = ''
    try {
      const user = {
        username,
        password
      }
      await props.logIn(user)
      props.displayNotificaton(`You logged in as ${username}`, 1000)

    } catch (err) {
      console.log(err)
      props.displayNotificaton('You failed to login', 1000)
    }
  }
  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>

        <Form.Label> Username:</Form.Label>  
        <Form.Control type="text" id = "username" name ="username">

        </Form.Control>
        <Form.Label>Password: </Form.Label>
        <Form.Control id = "password" name="password"></Form.Control>
        <Button variant ="primary" id = "login-button" type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export default connect(null, { logIn,displayNotificaton })(LoginForm)
