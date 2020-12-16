import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  displayNotificaton,
} from '../reducers/notificationReducer'
import {
  useHistory} from 'react-router-dom'
import {useField} from './hooks/useField'
const CreateNew = (props) => {
    const history = useHistory()
   // const [content, setContent] = useState('')
   // const [author, setAuthor] = useState('')
   // const [info, setInfo] = useState('')
  const {reset: resetContent, ...content} = useField('text') 
  const {reset: resetAuthor, ...author} = useField('text') 
  const {reset: resetInfo, ...info} = useField('text') 
  
    const handleSubmit = (e) => {
      console.log(props)
      console.log(props.addNew)
     e.preventDefault()
     props.addNew({
       content: content.value,
       author: author.value,
       info : info.value,
       votes: 0
     })
    console.log("sheet")
        props.displayNotificaton(`You added ${content.value}`, 5000)
       
        history.push("/")
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
        <button>create</button>
        </form>
        <button onClick={()=>{
        resetContent()
        resetAuthor()
        resetInfo()
        }}>reset</button>
      </div>
    )
  
  }
export default connect(null, {displayNotificaton })(CreateNew)