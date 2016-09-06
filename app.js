
window.onload = function() {
function locator(){
    var result = document.getElementById("main");
    //Location is available    
    function success(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        
        result.innerHTML = 'Latitude is' + lat + 'Longitude is' + long;
    };

    //Location is not available
    function error(){
        result.innerHTML = "Location unavailable";
    };
    
    //Initialize Geolocation API, pass success and error functions
    navigator.geolocation.getCurrentPosition(success, error);

};
    //Find the users location
    locator();

    //AJAX Call to Weather API using location
    
    var btn = document.getElementById("btn");
    var url ='http://api.openweathermap.org/data/2.5/weather?lat=38.928&lon=-77.02&units=metric&APPID=f72629dad5e8bf650b1a6290c7ea5374'
    
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState === 4) {
            if (request.status === 200){
                console.log("OKAY");
                console.log("Raw JSON response: ",request.responseText);
                var result = JSON.parse(request.responseText);
                console.log(result);
                //Things to extract: Name/City, Temp, Hi, Low -- anything else?
                var city = result.name;
                var temp = result.main["temp"];
                var tempHigh = result.main["temp_max"]
                var tempLow = result.main["temp_min"]
                console.log(city,temp, tempHigh, tempLow);





            } else {
                console.log("Not Okay");
            }
        }
    }
    //event listener
    btn.addEventListener('click', function(){
        request.open('GET',url);

        request.send();
    })


};