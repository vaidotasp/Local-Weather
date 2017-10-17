require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const getCityName = require('./modules/getCityName')
const tester = require('./modules/tester')
app.use(express.static('public'))

app.get('/', function(req, res, next) {
  console.log(getCityName.getCityName(38.897164, -77.244632))
     
    
  res.sendFile(__dirname + '/index.html')
})

//default error handler. We need to pass err to next() => next(err) for this to trigger
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500)
  res.json({ error: err.message })
})

app.listen(3000 || process.env.PORT)
