require("dotenv").config();

const mongoUrl = process.env?.MONGODB_URL;
const PORT = process.env?.PORT || 3003;


if(!mongoUrl) {
  console.log("No mongo db url found!")
  process.exit(1);
}




module.exports = { mongoUrl, PORT }
