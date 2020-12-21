import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'
let token = null
const setToken = (newToken) => {
    token = 'Bearer ' + newToken
  }
  const getAll = () => {
    console.log("User service get all")
    const config = { headers: { Authorization: token }, }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
  }
  export default { getAll, setToken }