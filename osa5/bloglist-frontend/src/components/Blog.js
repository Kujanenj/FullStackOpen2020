import React from 'react'
import { useParams } from 'react-router-dom'
import { connect } from "react-redux"
import { voteBlog, deleteBlog } from "../reducers/blogsReducer"
import { displayNotificaton } from "../reducers/notificationReducer"
import Comments from "./Comments"
const Blog = (props) => {
  const id = useParams().id

  const blog = props.blogs.find(blog => blog.id === id)
  if (!blog) {
    console.log("no blog")
    return null
  }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <br>
      </br>
      <a href={blog.url}>{blog.url}</a>
      <br></br>
                likes : {blog.likes}
      <button id="vote_button"
        onClick={() => {
          props.voteBlog(blog)
          props.displayNotificaton('You voted', 5000)
        }}
      >
        Vote
                </button>

      <br></br>
      {`Added by ${blog.user.username}`}
      {blog.user.username === props.user.username ? (


        <button id="delete_button"
          onClick={() => {
            props.deleteBlog(blog)
            props.displayNotificaton('You deleted', 5000)
          }}>
          Delete me
        </button>
      ) : (
          <div> </div>
        )}
      <Comments blog={blog}></Comments>

    </div>
  )
}
const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}
const mapDispatchToProps = { voteBlog, deleteBlog, displayNotificaton }
const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default connectedBlog