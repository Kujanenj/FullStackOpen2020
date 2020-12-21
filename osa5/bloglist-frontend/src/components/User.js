import React from "react"
const {useParams} = require("react-router-dom")
const User = ({ users, blogs }) => {
    
       const id = useParams().id

    
    console.log(id)
    const user = users.find(user => user.id === id)
    if(!user){
        return null
    }
    const addedBlogs = blogs.filter(blog => blog.user.id === user.id)
    return (
        <div>
            <h1>
                {user.name}
            </h1>

        added blogs
            <ul>

                {addedBlogs.map(blog => (
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default User