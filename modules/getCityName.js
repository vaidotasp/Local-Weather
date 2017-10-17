//const geoURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=55,55&key=' + process.env.API
//let geoURL
//Could be using http://freegeoip.net ????
//Helper function to grab city name from Long/Lat input using Google API

// let geoUrl =
//   'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long

const request = require('request')
const apiKey = process.env.API
function getCityName(lat, long) {
let cityName
let geoURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' + process.env.API
  request
    .get(geoURL, function (error, response, body) {
    if (error) console.err(error) 
      if (response.statusCode === 200) {
        let results = JSON.parse(body)
       // console.log(results.results)
        results.results.forEach(function(item){
          if (item.types[0] === 'locality' && item.types[1] === 'political'){
            //console.log('RESULT OUTPUT:', item['formatted_address'])  
            cityName = item['formatted_address']
           // sendCity(cityName)
          } else if (item.types[0] === 'administrative_area_level_1' && item.types[1] === 'political') {
            //console.log('NOT FOUND')
            //console.log(item)
             console.log('RESULT OUTPUT:', item['formatted_address'])  
            cityName = item['formatted_address']
           // sendCity(cityName)
           // console.log(cityName)  
            return cityName
          }    
        })
           } else {
        throw new Error('Response from API problem')
      }
  })
}

module.exports = getCityName
