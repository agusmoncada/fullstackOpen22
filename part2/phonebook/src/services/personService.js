import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObj => {
    return axios.post(baseUrl, newObj)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`) 
}

const update = (id) => {
    return axios.put(`${baseUrl}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    remove: remove,
    update: update
}