import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null
const setToken = (newToken) =>{
  token = "Bearer " + newToken
}
const getAll = () => {

  const config = { headers: { Authorization: token }, }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}
const createBlog = async newObject => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newObject, config)
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  const test = {...response.data, user : {
    id:response.data.user,
    username:  user.username,
    name : user.name
  }}
  console.log(window.localStorage.getItem('loggedUser'))
  console.log("response here --->",test) 

  return test


}
const update = async newObject => {
  const config = {headers: {Authorization: token},}
  const response = await axios.put(`${baseUrl}/${newObject.id}`,newObject,config)
  return response.data
}
const removeBlog = async objectToDelete => {
  const config = {headers: {Authorization: token},}
  const response = await axios.delete(`${baseUrl}/${objectToDelete.id}`, config)
  return response.statu
}
export default { getAll, createBlog,  setToken,update,removeBlog }