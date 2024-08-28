function errorHandler(err, req, res, next) {
  if (err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  } else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  next(err)
}

function tokenExtractor(request, response, next) {
  const auth = request.get("Authorization");
  request.token = null; 

  if(auth && auth.startsWith("Bearer ")) {
    request.token = auth.replace("Bearer", "");
  } 

  next(); 
}



module.exports = { errorHandler, tokenExtractor }
