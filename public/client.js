let locator = new Promise(function(resolve, reject) {
  console.log('Fetching location...')

  navigator.geolocation.getCurrentPosition(success, error)
  function error(position) {
    console.log('Location unavailable')
    reject(error)
  }
  function success(position) {
    const lat = position.coords.latitude
    const long = position.coords.longitude
    resolve({ lat: lat, long: long })
  }
})

locator.then(({ lat, long }) => {
  function status(response) {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  function json(response) {
    return response.json()
  }

  let content = {
    lat: lat,
    long: long
  }

  fetch('/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('data output goes here: ', data)
    })
    .catch(function(error) {
      console.log('request failed: ', error)
    })
})
// getLocation()
// function getLocation() {
//   navigator.geolocation.getCurrentPosition(success, error)
//   function success(position) {
//     const lat = position.coords.latitude
//     const long = position.coords.longitude
//     url =
//       'https://api.darksky.net/forecast/4d83a93ffa67e94375e32820270d6196/' +
//       lat +
//       ',' +
//       long +
//       '?exclude=daily,minutely,hourly,alerts,flags&units=si'
//     geoUrl =
//       'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
//       lat +
//       ',' +
//       long
//     getWeather()

//     let getCity = function() {
//       fetch(geoUrl, {
//         method: 'GET',
//         headers: 'application/json',
//         mode: 'cors' //FIXME: Not sure if needed?
//       })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err)) //FIXME: proper error handling needed
//     }
//     getCity()
//     // function getCity() {
//     //   $.ajax({
//     //     url: geoUrl,
//     //     dataType: 'json',
//     //     success: function(cityName) {
//     //       var cityResults = cityName.results[0].address_components
//     //       for (let i = 0; i < cityResults.length; i++) {
//     //         if (cityResults[i]['types'][0] === 'locality') {
//     //           var city = cityResults[i]['long_name']
//     //           document.getElementById('city').innerHTML = city
//     //         }
//     //       }
//     //     }
//     //   })
//     // }

//     function getWeather() {
//       $.ajax({
//         url: url,
//         dataType: 'jsonp',
//         success: function(weatherInfo) {
//           var temp = weatherInfo.currently['temperature'].toFixed()
//           var condition = weatherInfo.currently['icon']
//           var summary = weatherInfo.currently['summary']
//           condition = condition.charAt(0).toUpperCase() + condition.slice(1)
//           document.getElementById('temp').innerHTML = temp
//           document.getElementById('time').innerHTML = timeNow
//           document.getElementById('con').innerHTML = summary
//           switch (condition) {
//             case 'clear-day' || 'clear-night':
//               document.getElementById('image').src = 'img/clear.png'
//               break
//             case 'cloudy' || 'partly-cloudy-day' || 'partly-cloudy-night':
//               document.getElementById('image').src = 'img/cloudy.png'
//               break
//             case 'rain':
//               document.getElementById('image').src = 'img/drizzle.png'
//               break
//             case 'snow' || 'sleet':
//               document.getElementById('image').src = 'img/snow.png'
//               break
//             case 'Thunderstorm':
//               document.getElementById('image').src = 'img/storm.png'
//               break
//             default:
//               document.getElementById('image').src = 'img/cloudy.png'
//               break
//           }
//         }
//       })
//     }
//   }
//   //Location is not available
//   function error() {
//     var visible = document.querySelector('#locUnav')
//     visible.style.visibility = 'visible'
//     var cVisibility = document.querySelector('#cel')
//     cVisibility.style.visibility = 'hidden'
//     var fVisibility = document.querySelector('#far')
//     fVisibility.style.visibility = 'hidden'
//   }
// }

// //toggles the temp and converts it
// const cTemp = document.getElementById('cel')
// const fTemp = document.getElementById('far')
// cTemp.addEventListener('click', cTempConversion)
// fTemp.addEventListener('click', fTempConversion)

// function cTempConversion() {
//   document.getElementById('temp').innerHTML = ((document.getElementById('temp')
//     .innerHTML -
//     32) *
//     5 /
//     9
//   ).toFixed()
//   cTemp.removeEventListener('click', cTempConversion)
//   fTemp.addEventListener('click', fTempConversion)
// }

// function fTempConversion() {
//   const tempToggle = document.querySelector('#cel')
//   tempToggle.style['pointer-events'] = 'auto'
//   document.getElementById('temp').innerHTML = (parseInt(
//     document.getElementById('temp').innerHTML
//   ) *
//     9 /
//     5 +
//     32
//   ).toFixed()
//   cTemp.addEventListener('click', cTempConversion)
//   fTemp.removeEventListener('click', fTempConversion)
// }
