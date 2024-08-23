const blogsRouter = require('express').Router();
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!(blog.title) || !(blog.author)) {
    response.status(400).send();
    return;
  }

  const result = await blog.save();

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  if(!id) {
    response.status(400).send();
    return;
  }

  const result = await Blog.findByIdAndDelete(id);

  response.status(204).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const likes = request.body.likes;

  if(!id || !likes) {
    response.status(400).send();
    return;
  }

  const result = await Blog.findByIdAndUpdate(id, { likes }, { new: true});

  response.status(204).json(result)
})

module.exports = blogsRouter
