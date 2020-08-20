import React from 'react'

const BlogsForm = (blogAuthor,blogUrl,blogTitle,setBlogAuthor,setBlogUrl,setBlogTitle,handleCreateNewBlog) => (
    <div>
      <h2>Create new blogy</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={blogTitle}
            name="BlogTitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          ></input>
          <div></div>
          Author:
          <input
            type="text"
            value={blogAuthor}
            name="BlogAuthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          ></input>
          
          <div></div>
          Url
          <input
            type="text"
            value={blogUrl}
            name="BlogUrl"
            onChange={({ target }) => setBlogUrl(target.value)}
          >
          </input>
          <div>
           <button type="submit">Add</button>
           </div>
        </div>
      </form>
    </div>
  )
  export default BlogsForm