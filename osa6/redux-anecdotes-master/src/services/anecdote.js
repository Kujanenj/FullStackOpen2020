import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  console.log('This is async')
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}
const update = async (content) =>{
  const response = await axios.put(`${baseUrl}/${content.id}`, content)
  return response.data
}
export default {
  getAll,
  createNew,
  update
}
