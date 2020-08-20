import React from 'react'
import Blog from './Blog'

const Printblogs = (blogs) => (


    <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>

)
export default Printblogs