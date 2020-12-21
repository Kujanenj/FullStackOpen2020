import blogService from '../services/blogs'
export const createblog = content => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}
export const initblogs = () => {
  console.log('initBlogs')
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('got blogs')

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}
export const addComment =(blog,comment) =>{
  console.log("looki here_--->",blog,comment)  
  return async dispatch =>{

    let updatedBlog = await blogService.addComment(blog,comment)
    dispatch({
      type: "ADD_COMMENT",
      data: updatedBlog
    })
  }
}
export const voteBlog = blog => {
  return async dispatch => {
    await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'VOTE',
      data: blog
    })
  }
}
export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.removeBlog(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data : blog
    })
  }
}
const blogReducer = (state = [], action) => {
  let id
  switch (action.type) {
  case 'VOTE':
    id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedblog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog => (blog.id !== id ? blog : changedblog))
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    id = action.data.id
    return state.filter(blog => (blog.id !== id ? true : false))
    case 'ADD_COMMENT':
      return state.map(blog => (blog.id !== action.data.id ? blog : action.data))
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export default blogReducer
