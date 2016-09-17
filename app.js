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
        console.log('AJAX Call Failed');
      }
    }
  };
  //ajax initializer
  function handler(){
    request.open('GET',url);
    request.send();
  };

//Celsius vs Farenheit Conversions
//Deactive C button for the first go,
//would be deactivated by default, clicking on F would activate it.
//F button should change css > for cel to pointer-events:auto
  var cTemp = document.getElementById('cel');
  cTemp.addEventListener('click', function (event) {
    console.log("Celsius button clicked!");
  });
  var fTemp = document.getElementById('far');
  fTemp.addEventListener('click', function (event) {
    ctemp.
    console.log("Farenheit button clicked!");
  });
  

  


};