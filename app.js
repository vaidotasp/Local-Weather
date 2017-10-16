require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('/'))

app.get('/', function(req, res) {
  res.send('index.html')
})

app.listen(3000 || process.env.PORT)
