import React from 'react'
import { connect } from 'react-redux'
import { createblog } from '../reducers/blogsReducer'
import { displayNotificaton } from '../reducers/notificationReducer'
const BlogsForm = props => {
  const handleSubmit = event => {
    event.preventDefault()
    const title = event.target.title.value
    const url = event.target.url.value
    const author = event.target.author.value
    event.target.title.value = ''
    event.target.url.value = ''
    event.target.author.value = ''

    props.createblog({
      title,
      author,
      url,
      user: props.user
    })
    props.displayNotificaton('You created', 5000)
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input name="title" />
          <div></div>
          Author:
          <input name="author"></input>
          <div></div>
          Url:
          <input name="url"></input>
          <div>
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  )
}
const mapStateToProps = state => {
  return { user: state.user }
}
export default connect(mapStateToProps, { createblog, displayNotificaton })(BlogsForm)
