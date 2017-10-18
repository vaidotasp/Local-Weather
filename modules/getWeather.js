const dAPI = '4d83a93ffa67e94375e32820270d6196'

let getWeather = function(lat, long) {
  let URI =
    'https://api.darksky.net/forecast/' +
    dAPI +
    '/' +
    lat +
    ',' +
    long +
    '?exclude=daily,minutely,hourly,alerts,flags&units=si'

  return new Promise(function(resolve, reject) {})
}

module.exports = getWeather

//url =
//       'https://api.darksky.net/forecast/4d83a93ffa67e94375e32820270d6196/' +
//       lat +
//       ',' +
//       long +
//       '?exclude=daily,minutely,hourly,alerts,flags&units=si'

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
