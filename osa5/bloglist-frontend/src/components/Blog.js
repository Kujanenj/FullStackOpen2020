import React,{useState} from 'react'
const Blog = ({ blog,addLikeFunc ,deleteFunc,loggedUser}) =>  {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showFull,setShowFull] = useState(true) 
  //const [showDelete,setShowDelete] = useState(true)
  // const hideDeleteWhenTrue = { display: showDelete ? '' : 'none' }
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
    <div style = {blogStyle}>
  <div style = {showWhenVisible}>
    Title : {blog.title}
    <button onClick = {()  =>setShowFull(false)} > bam </button>
    <br></br>
     </div>
     <div style = {hideWhenVisible}>
    Title : {blog.title}
    <button onClick = {()  =>setShowFull(true)} > bam </button>
    <br></br>
    author: {blog.author}
     <br></br>
      likes : {blog.likes}
      <button onClick = {() =>addLikeFunc(blog)}>Liketä mua</button>
      <br></br>
       Urli: {blog.url}
       <div style ={showDeleteWhenTrue}>
      DeleteButton here
       <br></br>
       <button onClick = {()=> deleteFunc(blog)}>Delete me</button>
       </div>
      
  </div>
  </div>
)
  }
export default Blog
