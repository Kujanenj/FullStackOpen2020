import React from 'react'
import {useSelector} from 'react-redux'

const Notification = () => {
  const style = {
   border: 'solid',
   padding: 10,
   borderWidth: 1
 }
 const notification = useSelector((state) => {
  // Hides notification if the box is empty
  if (state.notifications.length === 0) {
    style.display = 'none'
  }
  return state.notifications
})
  return (
    <div style={style}>
      {notification}    </div>
  )
}

export default Notification