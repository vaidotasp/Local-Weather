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
      let temperature = data.temp
      temperature = temperature.toFixed() + '°C'
      document.getElementById('temp').innerHTML = temperature
      document.getElementById('description').innerHTML = data.summary
      document.getElementById('forecast').innerHTML = data.forecast
      document.getElementById('time').innerHTML = data.time
      document.getElementById('location').innerHTML = data.cityName
      weatherIcon(data.icon)
      console.log(`Icon is this one: ${data.icon}`)
    })
    .catch(function(error) {
      console.log('request failed: ', error)
    })
})

//C and F conversion functionality
const tempBtn = document.getElementById('tempBtn')
tempBtn.addEventListener('click', tempChange)

function tempChange() {
  let contentElem = document.getElementById('temp')
  let tempIndicator = contentElem.innerText[contentElem.innerText.length - 1]
  let newTemp = contentElem.innerText
  console.log(contentElem.innerText.length)
  if (contentElem.innerText.length === 3) {
    newTemp = '0' + contentElem.innerText
    console.log(newTemp)
  }
  console.log(tempIndicator)
  if (tempIndicator === 'C') {
    let convertedContentElem = (newTemp.slice(0, 2) * 9 / 5 + 32).toFixed()
    contentElem.innerText = convertedContentElem + '°F'
  }
  if (tempIndicator === 'F') {
    let convertedContentElem = ((contentElem.innerText.slice(0, 2) - 32) *
      5 /
      9
    ).toFixed()
    contentElem.innerText = convertedContentElem + '°C'
  }
}

//Day and Night theme functionality
const themeToggleBtn = document.getElementById('themeBtn')
themeToggleBtn.addEventListener('click', toggleTheme)

function toggleTheme() {
  console.log('toggle btn clicked')
  //check for which theme is loaded first
  let h1 = document.querySelector('.h1')
  let body = document.querySelector('.body')
  let mainDiv = document.getElementById('mainx')
  let mainDivStyle = window
    .getComputedStyle(mainDiv, null)
    .getPropertyValue('background-color')
  console.log(mainDivStyle)
  if (mainDivStyle === 'rgb(51, 51, 51)') {
    console.log('we are in dark theme territory')
    //change it to light theme
    mainDiv.style.backgroundColor = '#2D9CDB'
    h1.style.color = '#2D9CDB'
    body.style.backgroundColor = '#FFFFFF'
  }
  if (mainDivStyle === 'rgb(45, 156, 219)') {
    console.log('we are in light theme territory')
    body.style.backgroundColor = '#d8d8d8'
    mainDiv.style.backgroundColor = '#333333'
    h1.style.color = '#333333'
  }
}

function weatherIcon(icon) {
  switch (icon) {
    case 'clear-day' || 'clear-night':
      document.getElementById('img').src = 'img/clear.png'
      break
    case 'cloudy' || 'partly-cloudy-day' || 'partly-cloudy-night':
      document.getElementById('img').src = 'img/cloudy.png'
      break
    case 'rain':
      document.getElementById('img').src = 'img/drizzle.png'
      break
    case 'snow' || 'sleet':
      document.getElementById('img').src = 'img/snow.png'
      break
    case 'Thunderstorm':
      document.getElementById('img').src = 'img/storm.png'
      break
    default:
      document.getElementById('img').src = 'img/cloudy.png'
      break
  }
}

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
