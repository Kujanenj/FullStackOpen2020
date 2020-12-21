import userService from '../services/user'

export const initUsers = () => {
  console.log('initUserHere')
  return async dispatch => {
    const users = await userService.getAll()
    console.log('got users')

    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}


const userReducers = (state = [], action) => {
  switch (action.type) {
    
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export default userReducers
