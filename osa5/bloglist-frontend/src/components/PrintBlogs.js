import React from 'react'
import Blog from './Blog'

const Printblogs = ({blogs,addLikeFunc,deleteFunc,loggedUser}) => {

    return(
    <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLikeFunc={addLikeFunc} deleteFunc = {deleteFunc} loggedUser={loggedUser} />
        )}
    </div>

    )}
export default Printblogs