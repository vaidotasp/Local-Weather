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
    var url = 'files.json'
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState === 4) {
            if (request.status === 200){
                console.log("OKAY");
                console.log(request.responseText);
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