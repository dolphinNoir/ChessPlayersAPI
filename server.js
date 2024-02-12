require('dotenv').config()
const port = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const playerRouter = require("./Routes/players")

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL); 
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log("connected to DB"));



app.get("/", (req,res) => {
    res.json("Hello and welcome to the chess players API!")
})

app.use('/players', playerRouter)

app.listen(port, () => console.log(`started server on port ${port}`));
 
process.on('SIGINT', () => {
    db.close(() => {
      console.log('MongoDB connection closed due to application termination');
      process.exit(0);
    });
  });