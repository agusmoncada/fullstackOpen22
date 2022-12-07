const Blog = require('../models/blog')

const initialDB = [
    {
        "id": "637e24a9dea29a41df09dcfa",
        "title":"blog de prueba",
        "author":"agus",
        "url":"agus.com",
        "likes": "4",
        "__v": "0"
    },
    {
        "_id": "637e67f1cec8a94506c54446",
        "title":"blog de prueba",
        "author":"agus",
        "url":"agus.com",
        "likes": "4",
        "__v":"0"
    }
]

const newBadUser = [
    {
        username: "ag",
        name: "agustin",
        password: "correctPass"
    },
    {
        username: "incorrectPass",
        name: "agustin",
        password: ""
    },
]

const blogInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    blogInDb,
    initialDB,
    newBadUser
}