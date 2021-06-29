const express = require('express');
const db = require('./db');
const router = require('./routes')
// const loaderio = require('../loaderio-20c5b1e9a8571dd16f452769d88c4c80.txt')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use('/loaderio-20c5b1e9a8571dd16f452769d88c4c80', loaderio)
app.use('/qa', router);

app.listen(PORT, () => {
  console.log(`Server is listening at http://127.0.0.1:${PORT}`)
})