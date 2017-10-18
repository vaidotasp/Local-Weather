require('dotenv').config()
const rp = require('request-promise')
const dAPI = process.env.dAPI
let result
let formattedData = {
  "humidity": 5
}

let getWeather = function(lat, long) {
  let URI =
    'https://api.darksky.net/forecast/' +
    dAPI +
    '/' +
    lat +
    ',' +
    long +
    '?exclude=daily,minutely,hourly,alerts,flags&units=si'

  return new Promise(function(resolve, reject) {
    rp
      .get(URI, function(error, response, body){
      if (error) reject (error)
      //result = JSON.parse(body)
     //result = body
      //console.log(result)
    }).then(function(result){
      //formattedData.humidity = result["currently"]//["humidity"]
      //console.log(formattedData)
      
      result = JSON.parse(result)
      console.log("Server side res", result.latitude)
      resolve(result)
    })
   

  })

}

module.exports = getWeather
