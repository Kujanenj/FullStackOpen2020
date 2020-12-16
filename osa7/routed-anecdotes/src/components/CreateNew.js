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
  const content = useField('text') 
  const author = useField('text') 
  const info = useField('text') 
  
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
            <input name='content' value={content.value} onChange={content.onChange} />
          </div>
          <div>
            author
            <input name='author' value={author.value} onChange={author.onChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={info.value} onChange={info.onChange} />
          </div>
        <button>create</button>
        </form>
        <button onClick={()=>{
          content.reset()
          author.reset()
          info.reset()
        }}>reset</button>
      </div>
    )
  
  }
export default connect(null, {displayNotificaton })(CreateNew)