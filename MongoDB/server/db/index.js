const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/SDC'

const db = mongoose.connection;

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

db
  .then(db => console.log(`Connected to: ${mongoURI}`))
  .catch(err => {
    console.log(`There was an error connecting to mongo at: ${mongoURI}`);
    console.log(err)
  });

// const QuestionsModel = mongoose.model('')

module.exports = db;