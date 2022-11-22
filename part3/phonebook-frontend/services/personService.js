import axios from "axios"

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObj => {
    return axios.post(baseUrl, newObj)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`) 
}

const update = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
}

export default {
    getAll: getAll,
    create: create,
    remove: remove,
    update: update
}