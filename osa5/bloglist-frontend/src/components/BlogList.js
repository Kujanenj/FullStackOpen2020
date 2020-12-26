import React from 'react'
import { connect } from 'react-redux'
import {Link} from "react-router-dom"
import { Table } from 'react-bootstrap'
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
      <Table striped>
    <tbody>

      {blogs
        .sort(function (a, b) {
          return b.likes - a.likes
        })
        .map(blog => (
          <tr key={blog.id} style={blogStyle} className="blog">
            <td>
            <Link to ={`/blogs/${blog.id}`} id={blog.title}>
              {blog.title}
            </Link>
            </td>
          </tr>
        ))
      }
      </tbody>
      </Table>
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
