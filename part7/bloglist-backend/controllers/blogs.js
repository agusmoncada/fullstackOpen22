const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')
const blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 }).populate('comments', { content: 1 })

    response.json(blogs)
  })
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
  
    if (!request.user.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = await User.findById(request.user.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })
  
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogID = request.params.id
  
  if (!request.user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(blogID)
  
  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'this user cant delete the blog'})
  }
  
  await Blog.findByIdAndRemove(blogID)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const content = request.body.content
  const blogID = request.params.id

  const blog = await Blog.findById(blogID)

  const comment = new Comment({
    content: content,
    blog: blog._id
  })

  const savedComment = await comment.save()
  blog.comments.push(savedComment._id)
  const updatedBlog = await Blog.findByIdAndUpdate(blog._id, blog, { new: true })

  response.status(201).json(savedComment)
})

module.exports = blogsRouter