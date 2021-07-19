const express = require('express');
const db = require('./db');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/qa', router);

app.listen(PORT, () => {
  console.log(`Server is listening at http://127.0.0.1:${PORT}`);
});