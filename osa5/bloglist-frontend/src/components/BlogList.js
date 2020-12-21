import React from 'react'
import { connect } from 'react-redux'
import {Link} from "react-router-dom"
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blogs = props => {
  let blogs = props.blogs
  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort(function (a, b) {
          return b.likes - a.likes
        })
        .map(blog => (
          <div key={blog.id} style={blogStyle} className="blog">
            <Link to ={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </div>
        ))
      }
    </div>
  )
}


const mapStateToProps = state => {
  return {
    blogs: state.blogs,
  }
}
const connectedBlogs = connect(mapStateToProps, null)(Blogs)
export default connectedBlogs

//export default Printblogs
