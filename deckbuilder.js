// load modules
var express = require('express');
var request = require('request');
var deckBuilder = express();

var http = require('http').Server(deckBuilder);


//tell express that this information is the right of the people!
deckBuilder.use(express.static(__dirname + '/public'));

//tell Express that when webssite is loaded, bring user to homepage
deckBuilder.get('/', function(request, response){
	response.sendfile(__dirname + '/index.html');
});

// listen on port 3000
http.listen(3000, function(){
	console.log("Listening on Port 3gMoney");
});