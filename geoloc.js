var obj = {
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "277",
               "short_name" : "277",
               "types" : [ "street_number" ]
            },
        
            {
               "long_name" : "Mountain View",
               "short_name" : "Mountain View",
               "types" : [ "locality", "political" ]
            }
]}]};

for(var i=0; i < obj.results[0].address_components.length; i++) {
	if (obj.results[0].address_components[i]["types"][0] === "locality") {
  	console.log(obj.results[0].address_components[i]["short_name"]);
    break;
  }
  console.log(i);
};

