import loginService from '../services/login'
import blogService from '../services/blogs'

export const logIn = user => {
  return async dispatch => {
    let loggedInUser = await loginService.login(user)
    blogService.setToken(loggedInUser.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
    dispatch({
      type: 'SET',
      data: loggedInUser
    })
  }
}
export const initialUser = () => {
    console.log("initial user")
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const oldUser = JSON.parse(loggedUserJSON)
    return async dispatch => {
      dispatch({
        type: 'SET',
        data: oldUser
      })
    }
  }
  return async dispatch => {
    dispatch({
      type: 'RESET'
    })
  }
}
export const logOut = () => {
  console.log('logout')
  window.localStorage.removeItem('loggedUser')
  return async dispatch => {
    await dispatch({
      type: 'RESET'
    })
  }
}
const userReducer = (state = null, action) => {
    console.log("user Reducer doign something",action.type)
  switch (action.type) {
    case 'SET':
      console.log('logged the f in')
      return action.data
    case 'RESET':
        console.log("Resetting")
      return null
    default:
      return state
  }
}

export default userReducer
