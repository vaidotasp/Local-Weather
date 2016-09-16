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
    result.innerHTML = 'Latitude is' + lat + 'Longitude is' + long;
    url = 'http://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + long + '&units=metric&APPID=f72629dad5e8bf650b1a6290c7ea5374';
    console.log('post inject url: ', url);
    handler();

  };
  //Location is not available
  function error(){
    console.log("Unavailable");
    var visible = document.querySelector('#locUnav');
    visible.style.visibility = "visible";
  };
  
}

  
  //AJAX Call to Weather API using location
    
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readyState === 4) {
      if (request.status === 200){
        console.log('AJAX Call Success');
        console.log('Raw JSON response: ',request.responseText);
        var result = JSON.parse(request.responseText);
        console.log(result);
        var city = result.name;
        var temp = result.main['temp'].toFixed();
        var tempHigh = result.main['temp_max'].toFixed();
        var tempLow = result.main['temp_min'].toFixed();
        var condition = result.weather[0]['main'];
       
        document.getElementById('temp').innerHTML = temp + 'F';
        document.getElementById('city').innerHTML = city;
        document.getElementById('time').innerHTML = timeNow;
        document.getElementById('hilow').innerHTML = 'HI:' + tempHigh +' ' + 'LO:' +tempLow;
        document.getElementById('con').innerHTML = condition;

      } else {
        console.log('AJAX Call Failed');
      }
    }
  };
  //ajax initializer
  function handler(){
    request.open('GET',url);
    request.send();
  };


};