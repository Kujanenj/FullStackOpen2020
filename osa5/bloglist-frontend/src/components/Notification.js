import React from 'react'
import { useSelector } from 'react-redux'
import {Alert} from "react-bootstrap"
const Notification = () => {

  const notification = useSelector((state) => {
   
    return state.notifications
  })
  return (
    <div className="container">
      <Alert variant="success">

        {notification}
      </Alert>
    </div>
  )
}

export default Notification