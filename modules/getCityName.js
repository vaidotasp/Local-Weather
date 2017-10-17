//const geoURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=55,55&key=' + process.env.API
//let geoURL
//Could be using http://freegeoip.net ????
//Helper function to grab city name from Long/Lat input using Google API
//stackoverflow.com/questions/26291204/node-module-export-returning-undefined
//https: // let geoUrl =
//   'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long
require('dotenv').config()
const request = require('request')
var rp = require('request-promise')

const apiKey = 'AIzaSyB7hRswzO-Rd9OUfL-E1Xm_iNKgUcnFZq4'
module.exports = function getCityName(lat, long) {
  let cityName
  let geoURL =
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
    lat +
    ',' +
    long +
    '&key=' +
    apiKey
  rp
    .get(geoURL, function(error, response, body) {
      if (error) console.err(error)
      if (response.statusCode === 200) {
        let results = JSON.parse(body)
        // console.log(results)
        results.results.forEach(function(item) {
          if (item.types[0] === 'locality' && item.types[1] === 'political') {
            //  console.log('RESULT OUTPUT:', item['formatted_address'])
            cityName = item['formatted_address']
            //console.log(cityName)
          } else if (
            item.types[0] === 'administrative_area_level_1' &&
            item.types[1] === 'political'
          ) {
            cityName = item['formatted_address']
          }
        })
      } else {
        throw new Error('Response from API problem')
      }
    })
    .then(function() {
      // console.log('tHEEEEEN', cityName)
      return cityName
    })
  //console.log('Final CityName', cityName) // ===> this gets called first?
}
