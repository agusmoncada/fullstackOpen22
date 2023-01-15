const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const blog = require('../models/blog')

const api = supertest(app)

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const totalBlogs = await helper.blogInDb()
    
    expect(totalBlogs).toHaveLength(helper.initialDB.length)
}, 100000)

test('unique identifier is named id', async () => {
    const response = await helper.blogInDb()
    expect(response[0].id).toBeDefined()
})

test('a blog can be added', async () => {
    const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    }

    const blogsAtStart = await helper.blogInDb()
    
    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFndXN0aW4iLCJpZCI6IjYzOGU0MGJiYjJhMTNmZTE3YzJmNGQ5ZCIsImlhdCI6MTY3MDM1NDcyOH0.UkKUyXgsEgB29xam5sGwGy6A-EVdWbicDdJZV1rT630')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogInDb()
    
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    const lastBlog = blogsAtEnd.slice(-1)[0]

    await api
        .delete(`/api/blogs/${lastBlog.id}`)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFndXN0aW4iLCJpZCI6IjYzOGU0MGJiYjJhMTNmZTE3YzJmNGQ5ZCIsImlhdCI6MTY3MDM1NDcyOH0.UkKUyXgsEgB29xam5sGwGy6A-EVdWbicDdJZV1rT630')
        .expect(204)

}, 100000)

test('a blog without likes is added and defaults to 0', async () => {
    const newBlog = {
        title: 'blog without likes',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFndXN0aW4iLCJpZCI6IjYzOGU0MGJiYjJhMTNmZTE3YzJmNGQ5ZCIsImlhdCI6MTY3MDM1NDcyOH0.UkKUyXgsEgB29xam5sGwGy6A-EVdWbicDdJZV1rT630')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogInDb()
    
    const lastBlog = blogsAtEnd.slice(-1)[0]
    
    expect(lastBlog.likes).toBe(0)

    await api
        .delete(`/api/blogs/${lastBlog.id}`)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFndXN0aW4iLCJpZCI6IjYzOGU0MGJiYjJhMTNmZTE3YzJmNGQ5ZCIsImlhdCI6MTY3MDM1NDcyOH0.UkKUyXgsEgB29xam5sGwGy6A-EVdWbicDdJZV1rT630')
        .expect(204)

})

test('a blog without title or url is not created', async () => {
    const newBlog = {
        title: '',
        author: 'Edsger W. Dijkstra',
        url: '',
        likes: 3
    }

   const response = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFndXN0aW4iLCJpZCI6IjYzOGU0MGJiYjJhMTNmZTE3YzJmNGQ5ZCIsImlhdCI6MTY3MDM1NDcyOH0.UkKUyXgsEgB29xam5sGwGy6A-EVdWbicDdJZV1rT630')
        .send(newBlog)
        .expect(400)
        
    expect(response.error.text).toContain('Blog validation failed')
    
})

test('a blog can be deleted', async () => {
    const newBlog = {
        title: 'This blog shouldnt appear in db',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFndXN0aW4iLCJpZCI6IjYzOGU0MGJiYjJhMTNmZTE3YzJmNGQ5ZCIsImlhdCI6MTY3MDM1NDcyOH0.UkKUyXgsEgB29xam5sGwGy6A-EVdWbicDdJZV1rT630')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogInDb()

        const lastBlog = blogsAtEnd.slice(-1)[0]

    await api
        .delete(`/api/blogs/${lastBlog.id}`)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFndXN0aW4iLCJpZCI6IjYzOGU0MGJiYjJhMTNmZTE3YzJmNGQ5ZCIsImlhdCI6MTY3MDM1NDcyOH0.UkKUyXgsEgB29xam5sGwGy6A-EVdWbicDdJZV1rT630')
        .expect(204)
    
    const finalDB = await helper.blogInDb()
    
    
    expect(finalDB).toHaveLength(helper.initialDB.length)
})

test('a blog can be updated', async () => {
    const updateBlog = {
        title: 'This blog is updated',
        author: 'agus',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15
    }
    
    const blogsAtEnd = await helper.blogInDb()
        
    const lastBlog = blogsAtEnd.slice(-1)[0]

    await api
        .put(`/api/blogs/${lastBlog.id}`)
        .send(updateBlog)
    
    const finalDB = await helper.blogInDb()
    const updatedBlog = finalDB.slice(-1)[0]

    expect(updatedBlog.likes).toBe(15)
})

test('a blog without token is not created', async () => {
    const newBlog = {
        title: 'This blog shouldnt appear in db',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10
    }

   const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    
    expect(response.error.text).toContain("invalid token")
})

test('a comment can be added', async () => {
    const newComment = {
        content: 'a new comment test can be created'
    }

    await api
        .post('/api/blogs/639a3a31809dc2632152544e/comments')
        .send(newComment)
        .expect(201)
})

afterAll(() => {
    mongoose.connection.close()
})