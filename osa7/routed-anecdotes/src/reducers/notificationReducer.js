//This is gona style, dont do this actually. Global variables are bad
let timeoutID =""

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'DISPLAY':
      return action.message
    case 'HIDE':
      return []
    default:
      return state
  }
}
export const hideNotification = () => {
  return {
    type: 'HIDE',
  }
}
export const displayNotificaton = (message, timeout) => {

  if(timeoutID){
    console.log(timeoutID)
    clearTimeout(timeoutID)
  }
  return async (dispatch) => {
     timeoutID = setTimeout(() => {
        dispatch(hideNotification())
      }, timeout)
    
      await dispatch({ type: 'DISPLAY', message })
  }
   
  
}

export default notificationReducer
