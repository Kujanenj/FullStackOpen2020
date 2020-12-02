const notificationReducer = (state = [], action) => {
    console.log(action.type)
  switch (action.type) {
    case 'DISPLAY':
      return action.message
    case 'HIDE':
        console.log("HIDING")
      return []
    default:
      return state
  }
}
export const hideNotification = () => {
    console.log("HIDE")
  return {
    type: 'HIDE',
  }
}
export const displayNotificaton = (message, timeout) => {
  return async (dispatch) => {
    await dispatch({ type: 'DISPLAY', message })
    setTimeout(() => {
        dispatch(hideNotification())
      }, timeout)
  }
}

export default notificationReducer
