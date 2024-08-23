const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user")

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);

})

usersRouter.post("/", async (req, res) => {
  // TODO: implement check if user is already in database
  const {username, password, name }= req.body;

  if(!username || !password || username.length < 3 || password.length < 3) {
    res.status(400).json({ error: "username our password malformed"});
    return;
  }
  
  const isUserInDatabase = await User.findOne({ username });

  if(isUserInDatabase) {
    res.status(409).json({ error: "Username already registered"});
    return;
  }
  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash 
  })

  const savedUser = await user.save();

  res.status(201).json(savedUser);
})

module.exports = usersRouter
