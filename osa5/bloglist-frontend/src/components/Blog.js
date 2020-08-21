import React,{useState} from 'react'
const Blog = ({ blog }) =>  {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showFull,setShowFull] = useState(null) 
  return(
    <div style = {blogStyle}>
  <div>
    {blog.title}
    <br></br>
     {blog.author}
     <br></br>
      likes : {blog.likes}
      <br></br>
       {blog.url}
  </div>
  </div>
)
  }
export default Blog
