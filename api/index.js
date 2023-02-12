const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://localhost");
const db = mongo.db("twitter");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

const bcrypt =require("bcrypt");

const secret = "some secret" 

app.post('/users/login', async (req, res) => {
  const { handle, password } = req.body;

  if(!handle || !password) {
    return res.status(400).json({ msg: "Handle or password missing" });
  }

  const user = await db.collection('users').findOne({ handle })
  if(user) {
    const valid = await bcrypt.compare(password, user.password);
    if(valid) {
      const token = jwt.sign(user, secret);
      return res.send(token);
    }

  }

  res.status(401).json({err: "handle or password incorrect"})
})

const port = 8484;
app.listen(port, () => {
  console.log(`app is listening at port ${port}`)
})