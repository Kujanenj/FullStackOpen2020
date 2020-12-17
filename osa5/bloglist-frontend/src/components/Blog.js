import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = (props) => {
  const blog = props.blog
  const blogs = props.blogs
  const addLikeFunc = async blogObject => {
    blogObject.likes += 1

    const response = await blogService.addLike(blogObject)
    
    props.setBlogs(blogs.map(blog => (blog.id === response.id ? blogObject : blog)))

    props.setBlogs(
      blogs.sort((first, second) => {
        return first['likes'] > second['likes'] ? -1 : 1
      })
    )
  }
  const deleteFunc = async blogObject => {
    await blogService.removeBlog(blogObject)

    props.setBlogs(blogs.filter(blog => (blog.id !== blogObject.id ? true : false)))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showFull, setShowFull] = useState(true)
  const hideWhenVisible = { display: showFull ? 'none' : '' }
  const showWhenVisible = { display: showFull ? '' : 'none' }

  let flag = false

    if (blog.user.username === props.user.username) {
      flag = true
    } else {
      flag = false
    }
  const showDeleteWhenTrue = { display: flag ? '' : 'none' }
  return (
    <div style={blogStyle} className="blog">
      <div style={showWhenVisible}>
        Title : {blog.title}
        <br></br>
        author: {blog.author}
        <br></br>
        <button onClick={() => setShowFull(false)}> bam </button>
        <br></br>
      </div>
      <div style={hideWhenVisible}>
        Title : {blog.title}
        <br></br>
        author: {blog.author}
        <br></br>
        likes : {blog.likes}
        <button onClick={() => addLikeFunc(blog)}>Liketä mua</button>
        <br></br>
        Urli: {blog.url}
        <div style={showDeleteWhenTrue}>
          DeleteButton here
          <button onClick={() => deleteFunc(blog)}>Delete me</button>
        </div>
        <br></br>
        <button onClick={() => setShowFull(true)}> bam </button>
      </div>
    </div>
  )
}

export default Blog
