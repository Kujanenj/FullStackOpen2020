import React, { useState } from 'react'
import blogService from '../services/blogs'
const BlogsForm = props => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const createNewBlog = async blogObject => {
    //blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    props.setBlogs(props.blogs.concat(returnedBlog))
  }
  const handleTitleChange = event => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = event => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = event => {
    setBlogUrl(event.target.value)
  }
  const addBlog = event => {
    event.preventDefault()
    createNewBlog({
      author: blogAuthor,
      title: blogTitle,
      url: blogUrl,
      user: props.user
    })
  }
  return (
    <div>
      <h2>Create new blogy</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input value={blogTitle} onChange={handleTitleChange} />
          <div></div>
          Author:
          <input value={blogAuthor} onChange={handleAuthorChange}></input>
          <div></div>
          Url:
          <input value={blogUrl} onChange={handleUrlChange}></input>
          <div>
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default BlogsForm
