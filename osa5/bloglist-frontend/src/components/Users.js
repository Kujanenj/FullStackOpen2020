
import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
const Users = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initUsers())
    }, [props.blogs])
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
            {users.map(user => (
                <div key={user.id}>
                    {user.name}
                    Blogs --
                    {user.blogs.length}
                </div>
            ))}

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