import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import Menu from "./components/Menu"
import { initialUser, logOut } from './reducers/userReducer'
import './App.css'
import { initblogs } from './reducers/blogsReducer'

const App = (props) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initblogs())
  }, [dispatch])

  // const [blogs, setBlogs] = useState([])
  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  )
  let user = props.user
  return (
    <div>
      <Notification></Notification>

      <div>
        {user === null ? (
          loginForm()
        ) : (
            <div>
              <p>{user.name} logged in</p>
              <button onClick={() => props.logOut()}> logOut</button>
              <Menu></Menu>
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
export default connect(mapStateToProps, { logOut, initialUser })(App)
