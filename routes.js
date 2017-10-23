const express = require('express')
const router = express.Router()
const getCityName = require('./modules/getCityName')
const getWeather = require('./modules/getWeather')

router.get('/', function(req, res, next) {
  //console.log(`Payload received: ${req.body}`)
  getCityName(23.084107, -82.385197)
    .then(function(city) {
      console.log(`City Name is: ${city}`)
    })
    .catch(err => console.log(err))
  getWeather(23.084107, -82.385197)
    .then(function(data) {
      return data // no idea why I need then chaining here to access data?
    })
    .then(function(all) {
      console.log(all)
    })
    .catch(err => console.log(err))
  res.sendFile(__dirname + '/index.html')
})

router.post('/', function(req, res, next) {
  let lat = req.body.lat
  let long = req.body.long
  let locationInfo = {}

  getCityName(lat, long)
    .then(function(city) {
      console.log(`City Name is: ${city}`)
      locationInfo.cityName = city
    })
    .catch(err => console.log(err))
  getWeather(lat, long)
    .then(function(data) {
      return data // no idea why I need then chaining here to access data?
    })
    .then(function(all) {
      console.log(all)
      locationInfo['temp'] = all.temp
      locationInfo.humidity = all.humidity
      locationInfo.icon = all.icon
      locationInfo.summary = all.summary
      locationInfo.forecast = all.forecast
      res.json(locationInfo)
    })
    .catch(err => console.log(err))
})

module.exports = router
