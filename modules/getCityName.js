//Helper function to grab city name from Long/Lat input using Google API

// let geoUrl =
//   'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long

const apiKey = process.env.API

function getCityName(lat, long) {
  let cityName
  fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      lat +
      ',' +
      long,
    {
      method: 'GET',
      headers: 'application/json',
      mode: 'cors' //not sure if needed
    }
  )
    .then(response => response.json)
    .then(data => console.log(data))
    .catch(err => console.err(err))

  //return cityName
}

getCityName(32, 55)
