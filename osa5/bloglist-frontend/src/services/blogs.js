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
const create = async newObject => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newObject, config) 
  return response.data


}
const addLike = async newObject => {
  const config = {headers: {Authorization: token},}
  const response = await axios.put(`${baseUrl}/${newObject.id}`,newObject,config)
  return response.data
}

export default { getAll, create,  setToken,addLike }