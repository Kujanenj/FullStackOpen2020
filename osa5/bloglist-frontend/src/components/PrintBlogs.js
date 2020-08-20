import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
const Printblogs = ({ blogs }) => {
   

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}
export default Printblogs