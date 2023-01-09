import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const update = async updatedBlog => {
  const config = {
    headers: { Authorization: token},
  }

  const blog = {...updatedBlog, likes: updatedBlog.likes + 1}

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, blog, config)

  return response.data
}

const remove = async oldBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const blog = await axios.delete(`${baseUrl}/${oldBlog.id}`, config)

  return blog
}

export default { getAll, create, setToken, update, remove }