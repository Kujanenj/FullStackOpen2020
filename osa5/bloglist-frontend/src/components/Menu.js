import React from "react";
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import BlogList from "./BlogList"
import Blog from "./Blog"
import Users from "./Users"
import User from "./User"
import Togglable from "./Togglable";
import BlogForm from "./BlogsForm"
import Comments from "./Comments"
const Menu = (props) => {
    const padding = {
        padding: 5,
    };

    return (
        <Router>
            <div>
                <Link style={padding} to="/users">
                    Users
        </Link>
                <Link style={padding} to="/blogs">
                    Blogs
        </Link>
            </div>

            <Switch>
                <Route path="/blogs/:id">
                    <Blog></Blog>
                </Route>
                <Route path="/blogs">
                    <BlogList></BlogList>
                    <Togglable buttonLabel = "Create New">
                    <BlogForm></BlogForm>
                    </Togglable>
                </Route>
                <Route path="/users/:id">
                    <User users={props.users} blogs={props.blogs}></User>
                </Route>
                <Route path="/users">
                    <Users></Users>
                </Route>
                <Route path="/">
                </Route>
            </Switch>
        </Router>
    );
};
const mapStateToProps = state => {
    return {
        users: state.users,
        blogs: state.blogs
    }

}
export default connect(mapStateToProps, null)(Menu);
