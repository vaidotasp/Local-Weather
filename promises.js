	
//This is my code

//  [read.js]

var dir = require('node-dir');

var files = new Promise(function (resolve, reject) {
    dir.files('../sample/sample.txt', function (err, res){
        if (err) {
            reject(err);
            console.log('Oops, an error occured %s', err);
        }
        else {
            resolve(res);
        }
    });
});

exports.files = files;

//And then use it as such on the file that imports this module.

//  [app.js]

var read = require('read.js');

read.files.then(function(res) {
    console.log(res);
});