import {displayNotificaton} from "../reducers/notificationReducer"
import {addComment} from "../reducers/blogsReducer"
import {connect} from "react-redux"
import React from "react"
const Comments = (props) => {
    let comments = []
    console.log(props.blog)
        console.log("concatting",props.blog.comments)
        comments = comments.concat(props.blog.comments)
    console.log("here be comments",comments)
    const handleSubmit = async event => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''
        try {
            console.log(props.blog,comment,props)
            await props.addComment(props.blog, comment)
            props.displayNotificaton(`You adde comment`, 1000)

        } catch (err) {
            console.log(err)
            props.displayNotificaton('Comment failed', 1000)
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input name="comment"></input>
                <button type="submit">add comment</button>
            </form>
            <ul>

                {comments.map(comment => (
                    <li key={comment}>
                        {comment}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default connect(null, {addComment,displayNotificaton })(Comments)
