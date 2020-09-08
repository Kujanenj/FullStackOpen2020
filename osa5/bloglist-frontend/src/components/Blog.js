import React,{ useState } from 'react'
const Blog = ({ blog,addLikeFunc ,deleteFunc,loggedUser }) =>  {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showFull,setShowFull] = useState(true)
  const hideWhenVisible = { display: showFull ? 'none' : '' }
  const showWhenVisible = { display: showFull ? '' : 'none' }

  let flag = false
  if(blog.user.username === loggedUser.username){
    flag=true
  }
  else{
    flag=false
  }
  const showDeleteWhenTrue = { display: flag ? '' : 'none' }
  return(
    <div style = {blogStyle} className ="blog">
      
      <div style = {showWhenVisible}>
    Title : {blog.title}
    
        <br></br>
    author: {blog.author}
        <br></br>
        <button onClick = {()  => setShowFull(false)} > bam </button>
        <br></br>
      </div>
      <div style = {hideWhenVisible}>
    Title : {blog.title}
    
        <br></br>
    author: {blog.author}
        <br></br>
      likes : {blog.likes}
        <button onClick = {() => addLikeFunc(blog)}>Liketä mua</button>
        <br></br>
       Urli: {blog.url}
        <div style ={showDeleteWhenTrue}>
      DeleteButton here
          
          <button onClick = {() => deleteFunc(blog)}>Delete me</button>
        </div>
          <br>
          </br>
          <button onClick = {()  => setShowFull(true)} > bam </button>

      </div>
    </div>
  )
}


export default Blog
