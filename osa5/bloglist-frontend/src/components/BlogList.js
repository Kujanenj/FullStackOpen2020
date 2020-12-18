import React, {useState} from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { displayNotificaton } from '../reducers/notificationReducer'
import { voteBlog, deleteBlog } from '../reducers/blogsReducer'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blogs = props => {
  const [showFull, setShowFull] = useState(false)
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
            <div>Title: {blog.title}</div>
            <br></br>
            author: {blog.author}
            {showFull === false ? (
              <button onClick={() => setShowFull(!showFull)}> Show more </button>
            ) : (
              <div>
                <br></br>
                likes : {blog.likes}
                <button
                  onClick={() => {
                    props.voteBlog(blog)
                    props.displayNotificaton(`You voted`, 5000)
                  }}
                >
                 Vote
                </button>
                <br></br>
                {blog.user.username === 'test' ? (
                  
                  <button onClick={() => {
                    props.deleteBlog(blog)
                     props.displayNotificaton(`You deleted`, 5000)}}>
                    Delete me
                  </button>
                ) : (
                  <div> </div>
                )}
                <br>
                </br>
                  <button onClick={() => setShowFull(!showFull)}> Show less </button>
              </div>
              
            )}
          </div>
        ))}
    </div>
  )
}
const mapStateToProps = state => {
  return { blogs: state.blogs }
}
const mapDispatchToProps = { voteBlog, deleteBlog, displayNotificaton }
const connectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)
export default connectedBlogs

//export default Printblogs
