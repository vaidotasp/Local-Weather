require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const getCityName = require('./modules/getCityName')
const getWeather = require('./modules/getWeather')
app.use(express.static('public'))

app.get('/', function(req, res, next) {
  getCityName(23.084107, -82.385197)
    .then(function(city) {
      console.log(`City Name is: ${city}`)
    })
    .catch(err => console.log(err))
  getWeather(23.084107, -82.385197)
    .then(function(result) {
    console.log(`Weather is this: ${result}`)
    console.log(`Humidity is: ${result.currently}`)
  })
  res.sendFile(__dirname + '/index.html')
})

//default error handler. We need to pass err to next() => next(err) for this to trigger
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500)
  res.json({ error: err.message })
})

app.listen(3000 || process.env.PORT)
