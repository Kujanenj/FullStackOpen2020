import React from 'react'
import Blog from './Blog'

const Printblogs = ({blogs,addLikeFunc}) => {

    return(
    <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLikeFunc={addLikeFunc} />
        )}
    </div>

    )}
export default Printblogs