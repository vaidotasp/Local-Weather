//Global Initializer
window.onload = function() {
var timeNow =  new Date().toLocaleTimeString();
var url;
locator();


function locator(){
  var result = document.getElementById('main');

  navigator.geolocation.getCurrentPosition(success ,error);

  function success(position){   
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    // result.innerHTML = 'Latitude is' + lat + 'Longitude is' + long;
    url = 'https://api.darksky.net/forecast/4d83a93ffa67e94375e32820270d6196/' + lat + ',' + long;
    handler();

  };
  //Location is not available
  function error(){
    var visible = document.querySelector('#locUnav');
    visible.style.visibility = "visible";
    var cVisibility = document.querySelector('#cel');
    cVisibility.style.visibility = "hidden";
    var fVisibility = document.querySelector('#far');
    fVisibility.style.visibility = 'hidden';
  };
  
}

  
  //AJAX Call to Weather API using location
    
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readyState === 4) {
      if (request.status === 200){
        var result = JSON.parse(request.responseText);
        var city = result.name;
        var temp = result.main['temp'].toFixed();
        var tempHigh = result.main['temp_max'].toFixed();
        var tempLow = result.main['temp_min'].toFixed();
        var condition = result.weather[0]['main'];
       
        document.getElementById('temp').innerHTML = temp;
        document.getElementById('city').innerHTML = city;
        document.getElementById('time').innerHTML = timeNow;
        // document.getElementById('hilow').innerHTML = 'HI:' + tempHigh +' ' + 'LO:' +tempLow;
        document.getElementById('con').innerHTML = condition;
        switch (condition) {
          case "Clear":
            document.getElementById('image').src="img/clear.png";
            break;
          case "Clouds":
            document.getElementById('image').src="img/cloudy.png";
            break;
          case "Rain":
            document.getElementById('image').src="img/drizzle.png";
            break;
          case "Snow":
            document.getElementById('image').src="img/snow.png";
            break;
          case "Thunderstorm":
            document.getElementById('image').src="img/storm.png";
            break; 
          default:
            document.getElementById('image').src="img/cloudy.png";
            break;
        }

      } else {
        return false;
      }
    }
  };
  //ajax initializer
  function handler(){
    request.open('GET',url);
    request.send();
  };

  var cTemp = document.getElementById('cel');
  var fTemp = document.getElementById('far');
  cTemp.addEventListener('click', cTempConversion);
  fTemp.addEventListener('click', fTempConversion);  
    
    function cTempConversion() {
      document.getElementById('temp').innerHTML = ((document.getElementById('temp').innerHTML - 32) * 5 / 9).toFixed();
      cTemp.removeEventListener('click', cTempConversion);
      fTemp.addEventListener('click', fTempConversion);
    };
  
    function fTempConversion() {
      var tempToggle = document.querySelector('#cel');
      tempToggle.style['pointer-events'] = 'auto';
      document.getElementById('temp').innerHTML = (parseInt(document.getElementById('temp').innerHTML) * 9 / 5 + 32).toFixed();
      cTemp.addEventListener('click', cTempConversion);
      fTemp.removeEventListener('click', fTempConversion);
    };
  

  


};