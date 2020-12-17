import React from 'react'
import Blog from './Blog'

const Printblogs = ({ blogs, setBlogs, user }) => {

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
      ))}
    </div>
  )
}

export default Printblogs
