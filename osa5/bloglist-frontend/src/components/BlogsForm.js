import React from 'react'

const BlogsForm = ({
  blogAuthor,
  blogUrl,
  blogTitle,
  handleTitleChange,
  handleUrlChange,
  handleAuthorChange,
  handleCreateNewBlog 
})=> {
  return (
    <div>
      <h2>Create new blogy</h2>
      <form onSubmit={handleCreateNewBlog}>
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