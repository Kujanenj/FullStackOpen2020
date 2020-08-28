import React, { useState } from 'react'

const BlogsForm = ({
  createNewBlog,
  user
}) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    createNewBlog({
      author: blogAuthor,
      title : blogTitle,
      url : blogUrl,
      user : user
    })
  }
  return (
    <div>
      <h2>Create new blogy</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={blogTitle}
            onChange={handleTitleChange}
          />
          <div></div>
          Author:
          <input
            value={blogAuthor}
            onChange={handleAuthorChange}
          ></input>

          <div></div>
          Url:
          <input
            value={blogUrl}
            onChange={handleUrlChange}
          >
          </input>
          <div>
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default BlogsForm