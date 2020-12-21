
import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import {
    Link
  } from "react-router-dom"


const Users = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initUsers())
    }, [props.blogs,dispatch])
    const users = props.users
    console.log("users iin users", users)
    if (!users) {
        return null
    }
    return (
       

        <div>
            <h1>
                Users
       </h1>
       <ul>

            {users.map(user => (
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>
                    {user.name}
                    </Link>
                    Blogs --
                    {user.blogs.length}
                </li>
            ))}
            </ul>

        </div>
            
    )
}
const mapStateToProps = state => {
    return {
        users: state.users,
        blogs: state.blogs
    }
}
const connectedUsers = connect(mapStateToProps, { initUsers })(Users)
export default connectedUsers