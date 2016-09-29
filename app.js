//Global Initializer
$(document).ready(function() {
window.onload = function() {
var timeNow =  new Date().toLocaleTimeString();
var url;
var geoUrl;
locator();




function locator(){
  var result = document.getElementById('main');

  navigator.geolocation.getCurrentPosition(success ,error);

  function success(position){   
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    // result.innerHTML = 'Latitude is' + lat + 'Longitude is' + long;
    url = 'https://api.darksky.net/forecast/4d83a93ffa67e94375e32820270d6196/' + lat + ',' + long +'?exclude=daily,minutely,hourly,alerts,flags&units=si';
    geoUrl ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + 'long' + '&key=YOUR_API_KEY';

    console.log(url,geoUrl);
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
  //AJAX Calling to Google Geolocation
  // var geoReq = new XMLHttpRequest();
  // geoReq.onreadystatechange = function(){
  //   if (geoReq.readyState === 4) {
  //     if (geoReq.status === 200) {
  //       var result = JSON.parse(geoReq.responseText);
  //       var city = result.results['']
  //     }
  //   }
  // }
  
  
  
  // document.getElementById('city').innerHTML = city;
  
  //AJAX Call to Weather API using location
    
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readyState === 4) {
      if (request.status === 200){
        var result = JSON.parse(request.responseText);
        var city = 'city';
        var temp = result.currently['temperature'].toFixed();
        var condition = result.currently['icon'];
        // testing the response on the temp/condition
        console.log('temp', temp, 'condition', condition);
        document.getElementById('temp').innerHTML = temp;
        
        document.getElementById('time').innerHTML = timeNow;
        document.getElementById('con').innerHTML = condition;
        switch (condition) {
          case "clear-day" || "clear-night":
            document.getElementById('image').src="img/clear.png";
            break;
          case "cloudy" || "partly-cloudy-day" || "partly-cloudy-night":
            document.getElementById('image').src="img/cloudy.png";
            break;
          case "rain":
            document.getElementById('image').src="img/drizzle.png";
            break;
          case "snow" || "sleet":
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


//toggles the temp and converts it
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

});