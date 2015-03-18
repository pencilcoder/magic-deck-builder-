// load modules
var express = require('express');
var request = require('request');
var deckBuilder = express();
var request = require('request');
var http = require('http').Server(deckBuilder);
var url = require('url');

//tell express that this information is the right of the people!
deckBuilder.use(express.static(__dirname + '/public'));

//tell Express that when webssite is loaded, bring user to homepage
deckBuilder.get('/', function(req, response){
	response.sendfile(__dirname + '/index.html');
});

// listen for queries from users & display results
deckBuilder.get('/results/:cardquery', function(req, response){
	//get the user's query from the endpoint's url:
	var cardquery = req.params.cardquery;
	console.log(cardquery);

	// build the url of the request to the mtgapi:
	var options = {
		protocol: "http:",
		host: "api.mtgapi.com",
		pathname: "/v2/cards",
		query: {name: cardquery}
	}
	var mtgurl = url.format(options);
	//send a request over to the mtgapi, and listen for the 
	//response:
	request(mtgurl, function (error, mtgapiResponse, body){
		//extract the results from the mtgapi response:
		var results = JSON.parse(mtgapiResponse.body);

		if (results.total === 0){
			response.writeHead(200);
			response.write("Your card name is nonexistent");
			response.end();
		}
		//or, if results are found, take them out, and pass them to
		// the results.ejs template:
		else {
			response.locals = {
				"cardquery" : cardquery, 
				"cards" : results.cards
			};
			response.render("results.ejs");
		}
	});

	//console.log(mtgurl)
	// request(mtgurl).pipe(response);
	 //response.locals = {cardquery: iAmACoolAssCard, cards: []};
	 //response.render('results.ejs');
});

// listen on port 3000
http.listen(3000, function(){
	console.log("Listening on Port 3gMoney");
});