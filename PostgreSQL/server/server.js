const express = require('express');
const db = require('./db');
const router = require('./routes')

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/loaderio-6e50ede05229c46a0cd8ff7efe019af0', (req, res) => {
	res.send('loaderio-6e50ede05229c46a0cd8ff7efe019af0');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/qa', router);

app.listen(PORT, () => {
  console.log(`Server is listening at http://127.0.0.1:${PORT}`)
})
