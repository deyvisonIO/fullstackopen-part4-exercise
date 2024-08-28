const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if(!decodedToken.id) {
    response.status(401).json({ error: "token invalid"})
    return;
  }

  const user = await User.findById(decodedToken.id);
  if(!user) {
    response.status(400).json({ error: "user could not be found!"});
    return; 
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user._id
  });


  if(!(blog.title) || !(blog.author)) {
    response.status(400).send();
    return;
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);

  if(!user) {
    response.status(404).json({ error: "found no user with this id!"});
    return;
  }


  if(!id) {
    response.status(400).json({ error: "provide an blog id to delete"});
    return;
  }

  const blog = await Blog.findById(id);

  if(blog.user.toString() === user._id.toString()) {
    const result = await Blog.findByIdAndDelete(id);
    response.status(204).json(result);
    return;
  }


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
